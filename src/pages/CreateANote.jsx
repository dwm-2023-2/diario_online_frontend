import { Header } from "../layout/Header";
import { Section } from "../layout/Section";
import { Footer } from "../layout/Footer";
import { useNavigate } from "react-router-dom";
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
import { useRef, useState } from "react";
import { diarioStore } from "../stores/diarioStore";

export const CreateANote = () => {
  const title = useRef({});
  const [status, setStatus] = useState("Privado");
  const [value, setValue] = useState("");
  const [isValidFields, setIsValidFields] = useState(false);
  const diarioId = diarioStore((state) => state.diarioId);

  const theme = useTheme();
  const navigate = useNavigate();

  const handleTitleChange = (event) => {
    title.current.value = event.target.value;
    validateFields();
  };

  const handleContentChange = (content) => {
    setValue(content);
    validateFields();
  };

  const handleChange = (event) => {
    setStatus(event.target.value);
    validateFields();
  };

  const validateFields = () => {
    const isTitleValid = title.current.value.trim() !== "";
    const isContentValid = value.trim() !== "";
    const isStatusValid = status.trim() !== "";
    setIsValidFields(isTitleValid && isContentValid && isStatusValid);
  };

  const submit = (ev) => {
    ev.preventDefault();
    const payload = {
      title: title.current.value,
      content: value,
      status,
    };

    api
      .post("/registrosdiario/registroDiario", {
        tituloRegistro: title.current.value,
        conteudoRegistro: value,
        privacidade: status,
        diarioId: diarioId,
      })
      .then((response) => {
        console.log(response);
        navigate(`/diary/${diarioId}`);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
    console.log(payload);
  };

  console.log("diarioId: ", diarioId);

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
            Create a Note
          </Typography>
          <div className={styles.forms_box}>
            <div className={styles.forms_box__row}>
              <TextField
                id="title"
                label="Title"
                variant="outlined"
                size="medium"
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
                  onChange={handleChange}
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
              onChange={handleContentChange}
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
