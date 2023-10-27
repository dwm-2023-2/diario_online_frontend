import { Link } from "react-router-dom";
import styles from "../styles/Menu.module.css";
import { Button } from "@mui/material";
import { userStore } from "../stores/userState";

export const MenuButtons = () => {
  const userState = userStore((state) => state.userLogged);
  const setuserStore = userStore((state) => state.setUserState);

  let buttons;

  if (userState === false) {
    buttons = (
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
    );
  } else {
    buttons = (
      <ul className={styles.menu__list_user}>
        <li className={styles.menu__item}>
          <Link className={styles.menu__link} to="/profile">
            <Button variant="contained">Profile</Button>
          </Link>
        </li>

        <li className={styles.menu__item}>
          <Button variant="contained">Log Out</Button>
        </li>
      </ul>
    );
  }

  return <nav className={styles.menu}>{buttons}</nav>;
};
