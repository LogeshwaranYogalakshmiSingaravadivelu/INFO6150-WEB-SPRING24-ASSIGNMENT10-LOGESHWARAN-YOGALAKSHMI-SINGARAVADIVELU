import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const [error, setError] = useState(false);
  const [redirectToHome, setRedirectToHome] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const company = data.get("companyName");
    const job = data.get("jobTitle");
    const descript = data.get("description");
    const sal = data.get("salary");
    console.log({
      CompanyName: company,
      JobTitle: job,
      Description: descript,
      Salary: sal,
    });
    try {
        setError(false);
        const response = await axios.post("/user/create/job", {
          data,
          company,
          job,
          descript,
          sal
        });
        //console.log("Hello World222");
        //console.log(response.data);
        console.log(response.data.message);
        // console.log("Hello World");
        if (response.data.message) {
            setRedirectToHome(true);
          }
      } catch (error) {
        setError(true);
      }
  };

  if (redirectToHome) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h3">
            Add User
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="companyName"
                  name="companyName"
                  required
                  fullWidth
                  id="companyName"
                  label="Conpany Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="jobTitle"
                  label="Job Title"
                  name="jobTitle"
                  autoComplete="jobTitle"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                  autoComplete="description"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="salary"
                  label="Salary"
                  name="salary"
                  autoComplete="salary"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Insert User
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
