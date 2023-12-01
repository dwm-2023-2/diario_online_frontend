import { Header } from "../layout/Header";
import { Section } from "../layout/Section";
import { Footer } from "../layout/Footer";
import { userInfoStore } from "../stores/userInfo";
import styles from "../styles/Profile.module.css";
import { Typography, TextField, Button } from "@mui/material";

export const Profile = () => {
  const userInfoState = userInfoStore((state) => state.userInfo);

  let storageUserId = localStorage.getItem("userId");
  let storageUsername = localStorage.getItem("username");
  let storageEmail = localStorage.getItem("email");

  const submitSignup = () => {};

  return (
    <div>
      <Header></Header>
      <Section>
        <div className={styles.section}>
          <div className={styles.forms_box}>
            <div style={{ width: "100%" }}></div>
            <p>User Name: {storageUsername}</p>
            <p>User ID: {storageUserId}</p>
            <p>Email: {storageEmail}</p>
            <div className={styles.buttons}>
              <Button
                onClick={() => {
                  navigate("/editprofile");
                }}
                variant="contained"
              >
                Login
              </Button>
              <Button
                onClick={() => {
                  submitDelete();
                }}
                variant="contained"
              >
                Create
              </Button>
            </div>
          </div>
        </div>
      </Section>
      <Footer></Footer>
    </div>
  );
};
