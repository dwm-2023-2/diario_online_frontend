import { HeaderLogin } from "../layout/HeaderLogin";
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
    console.log(email);
    console.log(password);
  };

  return (
    <div style={{ marginTop: 50 }}>
      <HeaderLogin></HeaderLogin>
      <Section>
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
