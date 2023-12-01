import { Link } from "react-router-dom";
import styles from "../styles/Menu.module.css";
import { Button } from "@mui/material";
import { userStore } from "../stores/userState";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export const MenuButtons = () => {
  const userState = userStore((state) => state.userLogged);
  const setuserStore = userStore((state) => state.setUserState);
  const navigate = useNavigate();

  const submitLogOut = () => {
    api
      .get(`/users/logout/`)
      .then((response) => {
        navigate("/");
        setuserStore(false);
        localStorage.clear();
      })
      .catch((error) => {
        // Trate o erro, se necessário
        console.error(error);
      });
  };

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
          <Button
            onClick={() => {
              submitLogOut();
            }}
            variant="contained"
          >
            Log Out
          </Button>
        </li>
      </ul>
    );
  }

  return <nav className={styles.menu}>{buttons}</nav>;
};
