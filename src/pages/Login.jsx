import { HeaderLogin } from "../layout/HeaderLogin";
import { Section } from "../layout/Section";
import { Footer } from "../layout/Footer";
import { Link, useNavigate } from "react-router-dom";
import { Typography, TextField, Button } from "@mui/material";
import styles from "../styles/Login.module.css";
import { useState } from "react";
import api from "../services/api";
import { userStore } from "../stores/userState";
import { userInfoStore } from "../stores/userInfo";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);

  const userState = userStore((state) => state.userLogged);
  const setUserState = userStore((state) => state.setUserState);
  const userInfoState = userInfoStore((state) => state.userInfo);
  const setUserInfoState = userInfoStore((state) => state.setUserInfo);

  const navigate = useNavigate();
  // console.log(userInfoState);
  const validateEmail = (inputEmail) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValid = emailRegex.test(inputEmail);
    setIsValidEmail(isValid);
    setEmail(inputEmail);
  };

  const handleLogin = (response) => {
    setUserState(!userState.userLogged);
    setUserInfoState(response);
    navigate("/");
    console.log("User State: ", userState);
    console.log(response);
    console.log(userInfoState);
    localStorage.setItem("isUserLogged", true);
    localStorage.setItem("userId", response.id);
    localStorage.setItem("username", response.userName);
    localStorage.setItem("email", response.email);
  };

  const submitLogin = () => {
    api
      .post("/users/login", {
        email: email,
        password: password,
      })
      .then((response) => handleLogin(response.data))
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            // Erro de autenticação (email ou senha incorretos)
            alert("Senha Incorreta.");
          } else if (error.response.status === 402) {
            // Outro tratamento para o código de status 402, se necessário
            alert("Email incorreto.");
          } else {
            // Outros códigos de status diferentes de 401 e 402
            console.error("Erro de resposta do servidor:", error.response.data);
            console.error("Código de status HTTP:", error.response.status);
          }
        } else if (error.request) {
          // A solicitação foi feita, mas não recebeu resposta
          console.error("Sem resposta do servidor:", error.request);
        } else {
          // Algo aconteceu na configuração da solicitação que gerou um erro
          console.error("Erro ao configurar a solicitação:", error.message);
        }
      });
  };  

  let storageIsUserLogged = localStorage.getItem("isUserLogged");
  let boolStorageIsUserLogged = storageIsUserLogged === "true";
  let content;

  if (boolStorageIsUserLogged === false) {
    content = (
      <div className={styles.section}>
        <Typography sx={{ color: "white" }} variant="h6">
          Login to your account
        </Typography>
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
          <div style={{ width: "100%" }}>
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
            <div className={styles.links}>
              <Link to="/forgetpassword">
                <Typography
                  sx={{ fontWeight: "bold", fontSize: 10 }}
                  variant="body1"
                >
                  FORGOT THE PASSWORD?
                </Typography>
              </Link>
              <Link to="/signup">
                <Typography
                  sx={{ fontWeight: "bold", fontSize: 10 }}
                  variant="body1"
                >
                  CREATE ACCOUNT
                </Typography>
              </Link>
            </div>
          </div>

          {password && !isValidEmail ? (
            <Button
              onClick={() => {
                submitLogin();
              }}
              variant="contained"
              disabled
            >
              Login1
            </Button>
          ) : (
            <Button
              onClick={() => {
                submitLogin();
              }}
              variant="contained"
            >
              Login2
            </Button>
          )}
        </div>
      </div>
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
