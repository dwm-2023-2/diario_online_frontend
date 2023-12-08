import { useState, useEffect } from "react";
import { Header } from "../layout/Header";
import { Section } from "../layout/Section";
import { Footer } from "../layout/Footer";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import api from "../services/api";
import {
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  useTheme,
} from "@mui/material";
import styles from "../styles/CreateANote.module.css";

export const EditRegDiary = () => {
  const { param1 } = useParams();
  const [isValidFields, setIsValidFields] = useState(false);

  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("Privado");
  const [diarioId, setDiarioId] = useState();

  const [note, setNote] = useState(null);

  const theme = useTheme();
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/diarios/diario/${param1}`);
        setNote(response.data);
        const { tituloRegistro, conteudoRegistro, privacidade, diarioId } =
          response.data;
        setTitle(tituloRegistro);
        setValue(conteudoRegistro);
        setStatus(privacidade);
        setDiarioId(diarioId);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [param1]);

  const submit = (ev) => {
    ev.preventDefault();
    api;
    api
      .put(`/registrosdiario/registroDiario/${param1}`, {
        tituloRegistro: title,
        conteudoRegistro: value,
        privacidade: status,
        diarioId: diarioId,
      })
      .then(() => navigate(`/reg_diary/${param1}`))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  };

  return (
    <div>
      <Header></Header>
      <Section>
        <div className={styles.section}>
          <Typography
            sx={{
              fontWeight: "bold",
              color: "white",
              [theme.breakpoints.down("sm")]: {
                fontSize: theme.typography.h5.fontSize,
              },
            }}
            variant="h2"
          >
            Edit Note
          </Typography>
          <div className={styles.forms_box}>
            <div className={styles.forms_box__row}>
              <TextField
                id="title"
                label="Title"
                variant="outlined"
                size="medium"
                value={title}
                fullWidth
                onChange={handleTitleChange}
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  label="Status"
                  fullWidth
                  onChange={handleStatusChange}
                >
                  <MenuItem value={"Público"}>Public</MenuItem>
                  <MenuItem value={"Privado"}>Private</MenuItem>
                  <MenuItem value={"Compartilhado"}>Shared</MenuItem>
                </Select>
              </FormControl>
            </div>
            <ReactQuill
              image={true}
              className={styles.react_quill}
              theme="snow"
              value={value}
              onChange={handleValueChange}
            />
            <Button
              onClick={submit}
              variant="contained"
              disabled={!isValidFields}
            >
              Create
            </Button>
          </div>
        </div>
      </Section>
      <Footer></Footer>
    </div>
  );
};
