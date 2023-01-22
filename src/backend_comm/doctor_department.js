import axios from "axios";
// const host = "http://localhost:8000";
const host = "https://vending-machinebackend-production.up.railway.app";

export function getDepartments(setDepartments, setIsDepartmentsLoading) {
  let config = {
    method: "get",
    url: `${host}/list/departments`,
    headers: {},
  };

  axios(config)
    .then((response) => {
      const data = response.data;
      setDepartments(data["Departments"]);
      setIsDepartmentsLoading(false);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function getDoctors(department, setDoctors, setIsDoctorsLoading = null) {
  let config = {
    method: "get",
    url: `${host}/list/doctors?department=${department}`,
    headers: {},
  };

  axios(config)
    .then((response) => {
      const data = response.data;
      setDoctors(data["Doctors"]);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function getwaitingTime(token, setWaitingTime) {
  let config = {
    method: "get",
    url: `${host}/waiting_time?token=${token}`,
  };

  axios(config)
    .then((response) => {
      const data = response.data;
      setWaitingTime(data["waitingTime"]);
    })
    .catch((error) => {
      console.log(error);
    });
}
export function getToken(
  department,
  doctor,
  setNextToken,
  setIsLoading,
  setWaitingTime
) {
  let config = {
    method: "get",
    url: `${host}/generate_tkn?doctor=${doctor}&department=${department}`,
  };

  axios(config)
    .then((response) => {
      const data = response.data;
      setIsLoading(false);
      setNextToken(data["token"]);
      getwaitingTime(data["token"], setWaitingTime);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function selectToken(
  department,
  doctor,
  token,
  setCurrentToken,
  setNextToken,
  setWaitingTime
) {
  let config = {
    method: "put",
    url: `${host}/select_doctor?department=${department}&doctor=${doctor}&next_token=${token}`,
  };

  axios(config)
    .then((response) => {
      if (response.status == 200) {
        const data = response.data;
        setCurrentToken(data["token"]);
        setNextToken("");
        setWaitingTime("");
      } else {
        if (response.status == 400) {
          const data = response.data;
          if (data["detail"] == "Token Already Present") {
            alert("Token Already Present Chose New Token");
          }
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

export function getPatients(doctor, setPatientDetails) {
  let config = {
    method: "get",
    url: `${host}/get_patients?doctor=${doctor}`,
    headers: {},
  };

  axios(config)
    .then((response) => {
      if (response.status == 200) {
        console.log(response);

        const data = response.data;

        data === null
          ? setPatientDetails([])
          : setPatientDetails(data["details"]);
      } else {
        console.log(response.status);
        console.log(response.data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

export function consult(token, doctor, setPatientDetails) {
  console.log(doctor);
  let config = {
    method: "put",
    url: `${host}/consulting?token=${token}`,
    headers: {},
  };

  axios(config)
    .then((response) => {
      if (response.status == 200) {
        const data = response.data;
        getPatients(doctor, setPatientDetails);
      } else {
        console.log(response.status);
        console.log(response.data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
export function diagonsed(token, doctor, setPatientDetails) {
  let config = {
    method: "put",
    url: `${host}/diagonsed?token=${token}`,
    headers: {},
  };

  axios(config)
    .then((response) => {
      if (response.status == 200) {
        const data = response.data;
        getPatients(doctor, setPatientDetails);
      } else {
        console.log(response.status);
        console.log(response.data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
export function getTokenStatus(token, setTokenStatus) {
  let config = {
    method: "get",
    url: `${host}/token_status?token=${token}`,
    headers: {},
  };
  if (token == "") {
    return "";
  }
  axios(config)
    .then((response) => {
      if (response.status == 200) {
        const data = response.data;
        console.log(data);
        setTokenStatus(data["status"]);
        // return data["status"];
      } else {
        console.log(response.status);
        console.log(response.data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

export function resetToken(doctor, setPatientDetails) {
  let config = {
    method: "delete",
    url: `${host}/reset_tkn?doctor=${doctor}`,
    headers: {},
  };

  axios(config)
    .then((response) => {
      if (response.status == 200) {
        const data = response.data;
        getPatients(doctor, setPatientDetails);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

export function addNewDoctor(department, doctor, setDoctors) {
  let config = {
    method: "put",
    url: `${host}/add_doctor?doctor=${doctor}&department=${department}`,
    headers: {},
  };

  axios(config)
    .then((response) => {
      if (response.status == 200) {
        const data = response.data;
        getDoctors(department, setDoctors);
      } else {
        console.log(response.status);
        console.log(response.data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
