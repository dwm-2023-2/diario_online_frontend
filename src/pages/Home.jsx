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

export const Home = () => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    api
      .get("/notes/notes")
      .then((response) => setNotes(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  const buttonStyle = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
  };

  return (
    <div>
      <Header></Header>
      <Section>
        {notes.map((elements, index) => (
          <div key={index} style={{ backgroundColor: "#FFFDD0" }}>
            <p>Nome: {elements?.diarioNome}</p>
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
      <Footer></Footer>
    </div>
  );
};
