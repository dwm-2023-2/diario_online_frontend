import { Menu } from "./Menu";
import { Link } from "react-router-dom";
import styles from "../styles/Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <Link className={styles.header__links}>
        <div className={styles.header__home_link}>
          <span className={styles.header__logo}>DIARO ONLINE</span>
        </div>
      </Link>
      <Menu></Menu>
    </header>
  );
};
