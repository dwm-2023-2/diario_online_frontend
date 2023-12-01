import { Header } from "../layout/Header";
import { Section } from "../layout/Section";
import { Footer } from "../layout/Footer";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { diarioStore } from "../stores/diarioStore";

export const DiaryPage = () => {
  const { param1 } = useParams();
  const [diario, setDiario] = useState(null);
  const diarioId = diarioStore((state) => state.diarioId);
  const setDiarioId = diarioStore((state) => state.setDiarioId);

  const buttonStyle = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
  };

  const diarios = {
    // backgroundColor: "yellow",
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    padding: "40px",
    justifyContent: "center",
  };

  const diario1 = {
    backgroundColor: "#FFFDD0",
    padding: "10px",
    border: "solid 1px",
    borderRadius: "10px",
    cursor: "pointer",
    width: "200px",
  };

  const diarioTitulo = {
    fontSize: "14px",
    fontFamily: "Arial",
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    padding: "5px",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/diarios/diario/${param1}`);
        setDiario(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [param1]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "yyyy-MM-dd");
  };
  // console.log("Diario ID:");
  // console.log(diarioId);
  return (
    <div>
      <Header></Header>
      <Section>
        <div style={diarios}>
          {diario && (
            <div key={diario.diarioTitulo} style={diarioTitulo}>
              <p style={diarioTitulo}>
                <h1>{diario?.diarioNome}</h1>
              </p>
              <p style={{ textAlign: "center", color: "black" }}>
                <h3>{diario?.diarioDescricao}</h3>
              </p>
              <br />
              <p style={{ textAlign: "center" }}>
                <h4>{formatDate(diario?.createdAt)}</h4>
              </p>
            </div>
          )}
        </div>
        <Box sx={{ "& > :not(style)": { m: 1 } }}>
          <Fab color="primary" aria-label="add" style={buttonStyle}>
            <Link to="/create-note">
              <AddIcon />
            </Link>
          </Fab>
        </Box>
      </Section>
      <Footer></Footer>
    </div>
  );
};
