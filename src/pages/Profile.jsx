import { Header } from "../layout/Header";
import { Section } from "../layout/Section";
import { Footer } from "../layout/Footer";
import { userInfoStore } from "../stores/userInfo";
import api from "../services/api";
import styles from "../styles/Profile.module.css";
import { useNavigate } from "react-router-dom";
import { Typography, TextField, Button } from "@mui/material";
import Swal from "sweetalert2";

export const Profile = () => {
  const userInfoState = userInfoStore((state) => state.userInfo);
  const navigate = useNavigate();

  let storageUserId = localStorage.getItem("userId");
  let storageUsername = localStorage.getItem("username");
  let storageEmail = localStorage.getItem("email");

  const submitDelete = () => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Você não poderá reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, Deletar!"
    }).then((result) => {
      if (result.isConfirmed) {
        // If user confirms, proceed with the delete action
        api
          .delete(`/users/${storageUserId}`)
          .then((response) => {
            console.log(response);
            Swal.fire({
              title: "Deletado!",
              text: "Seu usuario foi removido com sucesso!.",
              icon: "success"
            });
            navigate("/login");
            localStorage.clear();
          })
          .catch((err) => {
            console.error("Oops! An error occurred" + err);
          });
      }
    });
  };

  return (
    <div>
      <Header></Header>
      <Section>
        <div className={styles.section}>
          <div className={styles.forms_box}>
            <div style={{ width: "100%" }}></div>
            <Typography variant="h4" color="primary" gutterBottom>
              User Name: {storageUsername}
            </Typography>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              User ID: {storageUserId}
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Email: {storageEmail}
            </Typography>
            <div className={styles.buttons}>
              <Button
                onClick={() => {
                  submitDelete();
                }}
                variant="contained"
                color="error"
              >
                Deletar usuario
              </Button>
            </div>
          </div>
        </div>
      </Section>
      <Footer></Footer>
    </div>
  );
};
