import { Header } from "../layout/Header";
import { Section } from "../layout/Section";
import { Footer } from "../layout/Footer";
import { Typography, TextField, Button } from "@mui/material";
import styles from "../styles/Login.module.css";

export const Login = () => {
  return (
    <div>
      <Header></Header>
      <Section>
        <div className={styles.section}>
          <Typography variant="h3">Login</Typography>
          <div className={styles.forms_box}>
            <TextField
              required
              id="outlined-basic"
              label="Email"
              variant="outlined"
              size="medium"
              state="enabled"
            />
            <TextField
              required
              id="outlined-basic"
              label="Password"
              type="password"
              variant="outlined"
              size="medium"
              state="enabled"
            />

            <Button variant="contained">Login</Button>
          </div>
        </div>
      </Section>
      <Footer></Footer>
    </div>
  );
};
