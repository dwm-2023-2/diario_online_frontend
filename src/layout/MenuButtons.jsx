import { Link } from "react-router-dom";
import styles from "../styles/Menu.module.css";
import { Button } from "@mui/material";

export const MenuButtons = () => {
  return (
    <nav className={styles.menu}>
      <ul className={styles.menu__list_user}>
        <li className={styles.menu__item}>
          <Link className={styles.menu__link} to="/login">
            <Button variant="contained">Log In</Button>
          </Link>
        </li>

        <li className={styles.menu__item}>
          <Link className={styles.menu__link} to="/signup">
            <Button variant="contained">Sign Up</Button>
          </Link>
        </li>
      </ul>
      {/* <ul className={styles.menu__list_user}>
        <li className={styles.menu__item}>
          <Link className={styles.menu__link} to="/profile">
            <Button variant="contained">Profile</Button>
          </Link>
        </li>

        <li className={styles.menu__item}>
          <Button variant="contained">Log Out</Button>
        </li>
      </ul> */}
    </nav>
  );
};
