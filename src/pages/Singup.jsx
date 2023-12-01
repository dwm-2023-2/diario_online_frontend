import { HeaderLogin } from "../layout/HeaderLogin";
import { Section } from "../layout/Section";
import { Footer } from "../layout/Footer";
import { Link, useNavigate } from "react-router-dom";
import { Typography, TextField, Button } from "@mui/material";
import styles from "../styles/Signup.module.css";
import { useState } from "react";
import api from "../services/api";

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValidName, setIsValidName] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true);

  const navigate = useNavigate();

  const validateEmail = (inputEmail) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValid = emailRegex.test(inputEmail);
    setIsValidEmail(isValid);
    setEmail(inputEmail);
  };

  const validateName = (inputName) => {
    const isValid = inputName.length >= 2;
    setIsValidName(isValid);
    setName(inputName);
  };

  const validatePassword = (inputPassword) => {
    const isValid = inputPassword.length >= 6;
    setIsValidPassword(isValid);
    setPassword(inputPassword);
  };

  const validateConfirmPassword = (inputConfirmPassword) => {
    const isValid = inputConfirmPassword === password;
    setIsValidConfirmPassword(isValid);
    setConfirmPassword(inputConfirmPassword);
  };

  const submitSignup = () => {
    if (
      isValidName &&
      isValidEmail &&
      isValidPassword &&
      isValidConfirmPassword
    ) {
      api
        .post("/users/signup", {
          userName: name,
          email: email,
          password: password,
        })
        .then((response) => navigate("/login"))
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
    } else {
      // console.log("Preencha todos os campos corretamente.");
    }
  };

  let storageIsUserLogged = localStorage.getItem("isUserLogged");
  let boolStorageIsUserLogged = storageIsUserLogged === "true";
  let content;

  if (boolStorageIsUserLogged === false) {
    content = (
      <Section>
        <div className={styles.section}>
          <Typography sx={{ color: "white" }} variant="h5">
            Create your Account
          </Typography>
          <div className={styles.forms_box}>
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              size="small"
              fullWidth
              value={name}
              onChange={(e) => {
                validateName(e.target.value);
              }}
              helperText={!isValidName ? "Nome inválido" : ""}
              error={!isValidName}
            />
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              size="small"
              fullWidth
              value={email}
              onChange={(e) => {
                validateEmail(e.target.value);
              }}
              helperText={!isValidEmail ? "Email inválido" : ""}
              error={!isValidEmail}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              type="password"
              variant="outlined"
              size="small"
              value={password}
              onChange={(e) => {
                validatePassword(e.target.value);
              }}
              helperText={
                !isValidPassword
                  ? "Senha inválida (mínimo de 6 caracteres)"
                  : ""
              }
              error={!isValidPassword}
              fullWidth
            />
            <div style={{ width: "100%" }}>
              <TextField
                id="outlined-basic"
                label="Confirm Password"
                type="password"
                variant="outlined"
                size="small"
                value={confirmPassword}
                onChange={(e) => {
                  validateConfirmPassword(e.target.value);
                }}
                fullWidth
                helperText={
                  !isValidConfirmPassword ? "As senhas não coincidem" : ""
                }
                error={!isValidConfirmPassword}
              />
            </div>

            <div className={styles.buttons}>
              <Button
                onClick={() => {
                  submitSignup();
                }}
                variant="contained"
                disabled={
                  !isValidName ||
                  !isValidEmail ||
                  !isValidPassword ||
                  !isValidConfirmPassword
                }
              >
                Create
              </Button>

              <Button
                onClick={() => {
                  navigate("/login");
                }}
                variant="contained"
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </Section>
    );
  } else {
    content = (
      <div className={styles.section}>
        <h2>User is already logged in!</h2>
      </div>
    );
  }

  return (
    <div style={{ marginTop: 50 }}>
      <HeaderLogin></HeaderLogin>
      <Section>{content}</Section>
      <Footer></Footer>
    </div>
  );
};
