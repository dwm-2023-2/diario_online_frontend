import { Header } from "../layout/Header";
import { Section } from "../layout/Section";
import { Footer } from "../layout/Footer";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import {
  EDITbuttonStyle,
  DELETEbuttonStyle,
  diarios,
  diarioTitulo,
} from "./DiaryPageStyles";

export const RegDiaryPage = () => {
  const { param1 } = useParams();
  const [note, setNote] = useState(null);

  const navigate = useNavigate();

  const submitDeleteNote = () => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (shouldDelete) {
      api
        .delete(`registrosdiario/registroDiario/${param1}`)
        .then((response) => {
          console.log(response);
          navigate(`/diary/${note?.diarioId}`);
        })
        .catch((err) => {
          console.error("ops! ocorreu um erro " + err);
        });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `/registrosdiario/registroDiario/${param1}`
        );
        setNote(response.data);
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

  return (
    <div>
      <Header></Header>
      <Section>
        <div style={diarios}>
          {note && (
            <div key={note.tituloRegistro} style={diarioTitulo}>
              <p style={diarioTitulo}>
                <h1>Nota: {note?.tituloRegistro}</h1>
              </p>
              <br />
              <p style={{ textAlign: "center" }}>
                <h4>Data de criação: {formatDate(note?.createdAt)}</h4>
              </p>
              <p style={{ textAlign: "center" }}>
                <h4>Última atualização: {formatDate(note?.updatedAt)}</h4>
              </p>
              <div
                dangerouslySetInnerHTML={{
                  __html: note?.conteudoRegistro || "",
                }}
              />
            </div>
          )}
        </div>
        <Box sx={{ "& > :not(style)": { m: 1 } }}>
          <Fab color="secondary" aria-label="edit" style={EDITbuttonStyle}>
            <EditIcon />
          </Fab>
        </Box>
        <Box
          onClick={() => submitDeleteNote()}
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
