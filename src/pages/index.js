import Head from "next/head";
import {
  Select,
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  AppBar,
  Typography,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import {
  getDepartments,
  getDoctors,
  getwaitingTime,
  getToken,
  selectToken,
} from "@/backend_comm/doctor_department";
import { padding } from "@mui/system";

export default function Home() {
  // #region state variables
  const [department, setDepartment] = useState("");
  const [doctor, setDoctor] = useState("");
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);

  const [nextToken, setNextToken] = useState("");
  const [curToken, setCurToken] = useState("");
  const [waitingTime, setWaitingTime] = useState("");

  //  #endregion

  // #region useEffect
  useEffect(() => {
    setIsLoading(true);
    getDepartments(setDepartments, setIsLoading);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getDoctors(department, setDoctors, setIsLoading);
  }, [department]);

  // #endregion

  // #region Components
  const appbar = (
    <AppBar sx={{ padding: "5px", marginBottom: "5px" }}>
      <Typography>Patient Token Vending Machine</Typography>
    </AppBar>
  );

  const departmentChosing = (
    <Box pt={5} flex="grow">
      <FormControl fullWidth>
        <InputLabel htmlFor="department">Department</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={department}
          label="Department"
          onChange={(e) => {
            setDepartment(e.target.value);
          }}
        >
          {departments.map((x) => {
            return (
              <MenuItem value={x} key={x}>
                {x}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );

  const doctorChosing = (
    <Box pt={5} flex="grow">
      <FormControl fullWidth>
        <InputLabel htmlFor="department">Doctor</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={doctor}
          label="Doctor"
          onChange={(e) => {
            setDoctor(e.target.value);
            getToken(department, e.target.value, setNextToken, setIsLoading);
            getwaitingTime(nextToken, setWaitingTime);
          }}
        >
          {doctors.map((x) => {
            return (
              <MenuItem value={x} key={x}>
                {x}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );

  const tokenSelection = (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography>Next Token: {nextToken}</Typography>
        <Typography>Waiting Time: {waitingTime} Mins</Typography>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          onClick={() => {
            selectToken(
              department,
              doctor,
              nextToken,
              setCurToken,
              setNextToken,
              setWaitingTime
            );
          }}
        >
          Accept Token
        </Button>
      </Grid>
    </Grid>
  );
  // #endregion
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Vending Machine" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {appbar}
      <Grid
        direction="column"
        justifyContent="center"
        alignItems="center"
        container
        spacing={3}
        sx={{ background: "green" }}
      >
        <Grid item sx={{ minWidth: "20%" }}>
          {departmentChosing}
        </Grid>

        {department && doctors.length > 0 ? (
          <Grid item sx={{ minWidth: "20%" }}>
            {doctorChosing}
          </Grid>
        ) : null}

        <Grid item>
          {nextToken != "" && waitingTime != "" && curToken == ""
            ? tokenSelection
            : null}
        </Grid>

        {curToken != "" && nextToken == "" ? (
          <Grid item>
            <Typography>Your Token: {curToken}</Typography>
          </Grid>
        ) : null}
      </Grid>
    </>
  );
}
