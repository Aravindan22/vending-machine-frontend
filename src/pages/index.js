import Head from "next/head";
import { Box, AppBar, Typography, Button, Stack } from "@mui/material";
import Link from "next/link";
import HealingIcon from "@mui/icons-material/Healing";
import VaccinesIcon from "@mui/icons-material/Vaccines";
export default function Home() {
  // #endregion

  // #region Components
  const appbar = (
    <AppBar sx={{ padding: "5px", marginBottom: "5px" }}>
      <Typography>Patient Token Vending Machine</Typography>
    </AppBar>
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
      <Box pt={5}>
        <Stack
          sx={{
            width: "fit-content",
            margin: "auto",
            position: "relative",
          }}
        >
          <Link href="/patient">
            <Button variant="contained" endIcon={<HealingIcon />}>
              Patient
            </Button>
          </Link>
          <br />
          <Link href="/doctor">
            <Button variant="contained" endIcon={<VaccinesIcon />}>
              Doctor
            </Button>
          </Link>
        </Stack>
      </Box>
    </>
  );
}
