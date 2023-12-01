import { Header } from "../layout/Header";
import { Section } from "../layout/Section";
import { Footer } from "../layout/Footer";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { userInfoStore } from "../stores/userInfo";
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
import { useRef, useState } from "react";

export const CreateDiary = () => {
  const title = useRef({});
  const description = useRef({});
  const [isValidFields, setIsValidFields] = useState(false);
  const userInfoState = userInfoStore((state) => state.userInfo);

  const [status, setStatus] = useState("Privado");

  let userId = localStorage.getItem("userId");

  const handleChange = (event) => {
    setStatus(event.target.value);
    validateFields();
  };

  const theme = useTheme();

  const navigate = useNavigate();
  const handleClick = () => navigate("/");

  const handleTitleChange = (event) => {
    title.current.value = event.target.value;
    validateFields();
  };

  const handleDescriptionChange = (event) => {
    description.current.value = event.target.value;
    validateFields();
  };

  const validateFields = () => {
    const _title = title.current.value ?? "";
    const _description = description.current.value ?? "";

    const isTitleValid = _title.trim() !== "";
    const isDescriptionValid = _description.trim() !== "";
    const isStatusValid = status.trim() !== "";
    setIsValidFields(isTitleValid && isDescriptionValid && isStatusValid);
  };

  console.log(userInfoState);

  const submit = (ev) => {
    ev.preventDefault();
    const payload = {
      title: title.current.value,
      description: description.current.value,
      status: status,
    };
    api
      .post("/diarios/diario", {
        diarioNome: title.current.value,
        diarioDescricao: description.current.value,
        privacidade: status,
        userId: userId,
      })
      .then((response) => navigate("/"))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
    // console.log(payload);
  };

  const payload = {
    title: title.current.value,
    description: description.current.value,
    status: status,
  };
  // console.log(payload);

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
            Create a Diary
          </Typography>
          <div className={styles.forms_box}>
            <TextField
              id="title"
              label="Title"
              variant="outlined"
              size="medium"
              fullWidth
              onChange={handleTitleChange}
            />
            <TextField
              id="description"
              label="Description"
              type="text"
              variant="outlined"
              size="medium"
              fullWidth
              onChange={handleDescriptionChange}
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

            {isValidFields ? (
              <Button
                onClick={(ev) => {
                  submit(ev);
                }}
                variant="contained"
              >
                Create
              </Button>
            ) : (
              <Button
                onClick={(ev) => {
                  submit(ev);
                }}
                variant="contained"
                disabled
              >
                Create
              </Button>
            )}
          </div>
        </div>
      </Section>
      <Footer></Footer>
    </div>
  );
};
