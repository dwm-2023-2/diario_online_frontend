import { useState, useEffect } from "react";
import { Header } from "../layout/Header";
import { Section } from "../layout/Section";
import { Footer } from "../layout/Footer";
import { useNavigate, useParams } from "react-router-dom";
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
import styles from "../styles/CreateDiary.module.css";

export const EditDiary = () => {
  const { param1 } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isValidFields, setIsValidFields] = useState(false);
  const [diario, setDiario] = useState(null);
  const [status, setStatus] = useState("Privado");

  let userId = localStorage.getItem("userId");

  const validateFields = () => {
    const isTitleValid = title.trim() !== "";
    const isDescriptionValid = description.trim() !== "";
    const isStatusValid = status.trim() !== "";
    setIsValidFields(isTitleValid && isDescriptionValid && isStatusValid);
  };

  const handleChange = (event) => {
    setStatus(event.target.value);
    validateFields();
  };

  const theme = useTheme();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/diarios/diario/${param1}`);
        setDiario(response.data);
        const { diarioNome, diarioDescricao, privacidade } = response.data;
        setTitle(diarioNome);
        setDescription(diarioDescricao);
        setStatus(privacidade);
        validateFields();
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [param1, validateFields]);

  const submit = (ev) => {
    ev.preventDefault();
    api
      .post("/diarios/diario", {
        diarioNome: title,
        diarioDescricao: description,
        privacidade: status,
        userId: userId,
      })
      .then(() => navigate("/"))
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
            Edit the diary
          </Typography>
          <div className={styles.forms_box}>
            <TextField
              id="title"
              label="Title"
              variant="outlined"
              size="medium"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              id="description"
              label="Description"
              type="text"
              variant="outlined"
              size="medium"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline={true}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Status"
                fullWidth
                onChange={handleChange}
              >
                <MenuItem value={"Público"}>Public</MenuItem>
                <MenuItem value={"Privado"}>Private</MenuItem>
                <MenuItem value={"Compartilhado"}>Shared</MenuItem>
              </Select>
            </FormControl>

            <Button
              onClick={(ev) => {
                submit(ev);
              }}
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
