import { Header } from "../layout/Header";
import { Section } from "../layout/Section";
import { Footer } from "../layout/Footer";
import { Link, useNavigate } from "react-router-dom";
import { Typography, TextField, Button } from "@mui/material";
import styles from "../styles/Login.module.css";
import { useState } from "react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);

  const navigate = useNavigate();
  const handleClick = () => navigate("/");

  const validateEmail = (inputEmail) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValid = emailRegex.test(inputEmail);
    setIsValidEmail(isValid);
    setEmail(inputEmail);
  };

  const submitLogin = () => {
    if (email !== "santos.erick@mail.uft.edu.br") {
      console.log("Incorrect email");
    } else {
      if (password !== "senhaparateste123@") {
        console.log("Senha incorreta.");
      } else {
        console.log("Usuário logado com sucesso!.");
        setEmail("");
        setPassword("");
        handleClick();
      }
    }
  };

  return (
    <div>
      <Header></Header>
      <Section>
        <div className={styles.section}>
          <Typography variant="h2">Login</Typography>
          <div className={styles.forms_box}>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              size="medium"
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
              size="medium"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              fullWidth
            />
            <Link to="/forgetpassword">
              <Typography variant="body1">FORGOT THE PASSWORD?</Typography>
            </Link>

            {password && !isValidEmail ? (
              <Button
                onClick={() => {
                  submitLogin();
                }}
                variant="contained"
                disabled
              >
                Login
              </Button>
            ) : (
              <Button
                onClick={() => {
                  submitLogin();
                }}
                variant="contained"
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </Section>
      <Footer></Footer>
    </div>
  );
};
