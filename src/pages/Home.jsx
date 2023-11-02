import { Header } from "../layout/HeaderHomeNotLogin";
import { Section } from "../layout/Section";
import { Footer } from "../layout/Footer";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import api from "../services/api";
import { userStore } from "../stores/userState";

export const Home = () => {
  const [notes, setNotes] = useState([]);
  const [isNotesEmpty, setIsNotesEmpty] = useState(false);

  const userState = userStore((state) => state.userLogged);
  const setUserState = userStore((state) => state.setUserState);

  useEffect(() => {
    api
      .get("/diarios/diarios")
      .then((response) => {
        setNotes(response.data);
        setIsNotesEmpty(response.data.length === 0);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  const buttonStyle = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
  };

  let content;

  if (userState === false) {
    content = (
      <Section>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "120px",
          }}
        >
          <img src="src/assets/image1.png" alt="note2note logo" />
          <Typography sx={{ color: "white", textAlign: "center" }} variant="h2">
            Create a free online diary in minutes.
          </Typography>
          <Typography
            sx={{ color: "white", textAlign: "center", mt: 2 }}
            variant="h5"
          >
            Note2Note is your personal space to record thoughts, feelings and
            experiences.
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ mt: 3 }}
          >
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/login"
            >
              Login
            </Button>
            <Box sx={{ width: 16 }} />
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/signup"
            >
              Create Account
            </Button>
          </Box>
        </div>
      </Section>
    );
  } else if (isNotesEmpty) {
    content = (
      <Section>
        <Typography sx={{ color: "white", textAlign: "center" }} variant="h3">
          Empty list. Create a Diary below
        </Typography>
        <Box sx={{ "& > :not(style)": { m: 1 } }}>
          <Fab color="primary" aria-label="add" style={buttonStyle}>
            <Link to="/create-diary">
              <AddIcon />
            </Link>
          </Fab>
        </Box>
      </Section>
    );
  }
  return (
    <div>
      <Header></Header>
      {content}
      <Footer></Footer>
    </div>
  );
};
