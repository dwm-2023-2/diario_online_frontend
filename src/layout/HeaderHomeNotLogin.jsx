import { MenuButtons } from "./MenuButtons";
import { Link } from "react-router-dom";
import styles from "../styles/Header.module.css";
import { Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.menuIcon} onClick={toggleMenu}>
        <MenuIcon />
      </div>
      <Link to="/" className={styles.header__links}>
        <Typography variant="h4">Note2Note</Typography>
      </Link>
    </header>
  );
};
