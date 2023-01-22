import {
  Table,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  AppBar,
  Typography,
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Button,
  Select,
  TableBody,
} from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";
import {
  getDepartments,
  getDoctors,
  getwaitingTime,
  getToken,
  selectToken,
  getPatients,
  consult,
  diagonsed,
  resetToken,
} from "@/backend_comm/doctor_department";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

export default function Doctor() {
  // #region state variables
  const [department, setDepartment] = useState("");
  const [doctor, setDoctor] = useState("");
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);

  const [patientDetailsList, setPatientDetailsList] = useState([]);

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
            setDoctors([]);
            setDoctor("");
            setDepartment(e.target.value);
            setPatientDetailsList([]);
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
            setPatientDetailsList([]);
            setDoctor(e.target.value);
            getPatients(e.target.value, setPatientDetailsList);
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

  const patientDetails = (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Token</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Consult</TableCell>
            <TableCell>Diagnosed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patientDetailsList.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.token}</TableCell>
              <TableCell>{row.diagonsed == 1 ? "Yes" : "No"}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  disabled={row.diagonsed === 1 || row.diagonsed === 0}
                  onClick={() => {
                    consult(row.token, doctor, setPatientDetailsList);
                  }}
                >
                  Consult
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  disabled={row.diagonsed === 1}
                  onClick={() => {
                    diagonsed(row.token, doctor, setPatientDetailsList);
                  }}
                >
                  Diagnosed
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
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
        sx={{ background: "white" }}
      >
        <Grid item sx={{ minWidth: "20%" }}>
          {departmentChosing}
        </Grid>

        {department && doctors.length > 0 ? (
          <Grid item sx={{ minWidth: "20%" }}>
            {doctorChosing}
          </Grid>
        ) : null}
        {doctor.length > 0 ? (
          <Grid item>
            <Button
              endIcon={<RestartAltIcon />}
              variant="contained"
              color="secondary"
              onClick={() => {
                resetToken(doctor, setPatientDetailsList);
              }}
            >
              Reset Tokens for the day
            </Button>
          </Grid>
        ) : null}
        {department != "" &&
        doctor.length != "" &&
        patientDetailsList.length > 0 ? (
          <Grid item>{patientDetails}</Grid>
        ) : null}
      </Grid>
    </>
  );
}
