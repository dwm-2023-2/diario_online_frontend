import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "../styles/HeaderLogin.module.css";

export const HeaderLogin = () => {
  return (
    <header className={styles.header}>
      <img src="src/assets/image1.png" alt="note2note logo" />
      <Link to="/" className={styles.header__links}>
        <Typography
          className={styles.header__links}
          sx={{ fontWeight: "bold", color: "white" }}
          variant="h3"
        >
          Note2Note
        </Typography>
      </Link>
    </header>
  );
};
