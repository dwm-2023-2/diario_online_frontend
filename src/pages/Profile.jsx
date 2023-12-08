import { Header } from "../layout/Header";
import { Section } from "../layout/Section";
import { Footer } from "../layout/Footer";
import { userInfoStore } from "../stores/userInfo";
import api from "../services/api";
import styles from "../styles/Profile.module.css";
import { useNavigate } from "react-router-dom";
import { Typography, TextField, Button } from "@mui/material";

// ... (importações existentes)

export const Profile = () => {
  const userInfoState = userInfoStore((state) => state.userInfo);
  const navigate = useNavigate();

  let storageUserId = localStorage.getItem("userId");
  let storageUsername = localStorage.getItem("username");
  let storageEmail = localStorage.getItem("email");

  const submitDelete = () => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (shouldDelete) {
      api
        .delete(`/users/${storageUserId}`)
        .then((response) => {
          console.log(response);
          navigate("/");
          localStorage.clear();
        })
        .catch((err) => {
          console.error("Oops! An error occurred" + err);
        });
    }
  };

  const handleEdit = () => {
    // continuar a lógica
    navigate(`/edit-profile/${storageUserId}`);
  };

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
              <Button onClick={handleEdit} variant="contained" color="primary">
                Editar perfil
              </Button>
              <Button
                onClick={() => {
                  submitDelete();
                }}
                variant="contained"
                color="error"
              >
                Deletar usuário
              </Button>
            </div>
          </div>
        </div>
      </Section>
      <Footer></Footer>
    </div>
  );
};
