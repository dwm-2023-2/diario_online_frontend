import { Menu } from "./Menu";
import { Link } from "react-router-dom";
import styles from "../styles/Header.module.css";
import { Typography } from "@mui/material";

export const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.header__links}>
        <Typography variant="h4">Note2Note</Typography>
      </Link>
      <Menu></Menu>
    </header>
  );
};
