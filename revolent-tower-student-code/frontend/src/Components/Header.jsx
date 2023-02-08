import { Button, Grid, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import EmailIcon from "@mui/icons-material/Email";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

function Header({ onPlayClick }) {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSubmit = () => {
    let isErr = false;
    if (name === "") {
      setNameError("Name is required");
      isErr = true;
    }
    if (email === "") {
      setEmailError("Email is required");
      isErr = true;
    } else if (!validateEmail(email)) {
      setEmailError("Email is not valid");
      isErr = true;
    }
    return isErr;
  };
  return (
    <div
      style={{
        display: "flex",
        // height: 109,
        boxShadow: "rgb(38 123 209 / 20%) 0px 8px 24px",
        borderRadius: 5,
        padding: "30px 25px 30px 25px",
        justifyContent: "space-around",
        marginBottom: 30,
        marginTop: 30,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} lg={5}>
          <TextField
            id="outlined-required"
            label="Name"
            style={{ marginRight: 15 }}
            fullWidth
            onChange={(e) => {
              setName(e.target.value);
              setNameError("");
            }}
            error={nameError != ""}
            helperText={nameError}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountBoxIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4} lg={5}>
          <TextField
            required
            id="outlined-required2"
            label="Email"
            defaultValue=""
            fullWidth
            error={emailError != ""}
            style={{ marginRight: 15, borderColor: "#2e2e3d" }}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
            }}
            helperText={emailError}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4} lg={2}>
          <Button
            style={{
              height: 56,
              width: "100%",
              fontSize: 20,
              textTransform: "capitalize",
              color: "#2e2e3d",
              borderColor: "#2e2e3d",
            }}
            endIcon={<SportsEsportsIcon />}
            variant="outlined"
            onClick={() => {
              if (!handleSubmit()) {
                sessionStorage.setItem("email", email);
                sessionStorage.setItem("fullName", name);
                onPlayClick();
              }
            }}
          >
            Play
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Header;
