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
// import { diarioStore } from "../stores/diarioStore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// import { ContactSupportOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  ADDbuttonStyle,
  EDITbuttonStyle,
  DELETEbuttonStyle,
  diarios,
  regDiarios,
  diarioTitulo,
} from "./DiaryPageStyles";

export const DiaryPage = () => {
  const { param1 } = useParams();
  const [diario, setDiario] = useState(null);
  const [notes, setNotes] = useState([]);

  const navigate = useNavigate();

  const submitDeleteDiary = () => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this diary?"
    );

    if (shouldDelete) {
      api
        .delete(`diarios/diario/${param1}`)
        .then((response) => {
          console.log(response);
          navigate(`/`);
        })
        .catch((err) => {
          console.error("ops! ocorreu um erro " + err);
        });
    }
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

  useEffect(() => {
    api
      .get(`registrosdiario/registrosDiario?diarioId=${param1}`)
      .then((response) => {
        console.log(response);
        setNotes(response.data);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, [param1]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "yyyy-MM-dd");
  };

  const navigateWithParams = (regDiarioId) => {
    navigate(`/reg_diary/${regDiarioId}`);
  };

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
        <div style={regDiarios}>
          {" "}
          {/* erro a partir daq */}
          {notes.map((elements, index) => (
            <div
              key={index}
              style={diario}
              onClick={() => {
                navigateWithParams(elements?.id);
              }}
            >
              <p style={diarioTitulo}>{elements?.tituloRegistro}</p>
              <p
                style={{
                  textAlign: "center",
                  fontFamily: "Arial",
                  color: "white",
                }}
              >
                {elements?.id}
                {elements?.conteudoRegistro}
              </p>
              <p
                style={{
                  textAlign: "center",
                  fontFamily: "Arial",
                  color: "white",
                }}
              >
                {formatDate(elements?.createdAt)}
              </p>
            </div>
          ))}
        </div>
        <Link to="/create-note">
          <Box sx={{ "& > :not(style)": { m: 1 } }}>
            <Fab color="primary" aria-label="add" style={ADDbuttonStyle}>
              <AddIcon />
            </Fab>
          </Box>
        </Link>
        <Box sx={{ "& > :not(style)": { m: 1 } }}>
          <Fab color="secondary" aria-label="edit" style={EDITbuttonStyle}>
            <EditIcon />
          </Fab>
        </Box>
        <Box
          onClick={() => submitDeleteDiary()}
          sx={{ "& > :not(style)": { m: 1 } }}
        >
          <Fab
            aria-label="delete"
            style={{ ...DELETEbuttonStyle, backgroundColor: "#FF0000" }}
          >
            <DeleteIcon />
          </Fab>
        </Box>
      </Section>
      <Footer></Footer>
    </div>
  );
};
