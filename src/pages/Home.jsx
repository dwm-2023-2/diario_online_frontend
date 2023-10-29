import { Header } from "../layout/Header";
import { Section } from "../layout/Section";
import { Footer } from "../layout/Footer";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
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
        <Typography sx={{ color: "white", textAlign: "center" }} variant="h1">
          User not logged
        </Typography>
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
  } else {
    content = (
      <Section>
        {notes.map((elements, index) => (
          <div key={index} style={{ backgroundColor: "#FFFDD0" }}>
            <p>Nome: {elements?.diarioNome}</p>
            <p>Owner's ID: {elements?.userId}</p>
            <p>Data: {elements?.createdAt}</p>
          </div>
        ))}
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
