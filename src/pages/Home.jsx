import { Header } from "../layout/Header";
import { Section } from "../layout/Section";
import { Footer } from "../layout/Footer";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import api from "../services/api";
import { userStore } from "../stores/userState";
import { userInfoStore } from "../stores/userInfo";
import { format } from "date-fns";
import { diarioStore } from "../stores/diarioStore";

export const Home = () => {
  const [notes, setNotes] = useState([]);
  const [isNotesEmpty, setIsNotesEmpty] = useState(false);

  const userState = userStore((state) => state.userLogged);

  if (userState) {
    localStorage.setItem("isUserLogged", true);
  }

  let storageIsUserLogged = localStorage.getItem("isUserLogged");
  console.log("storageIsUserLogged: ", storageIsUserLogged);
  console.log("storageIsUserLogged type: ", typeof storageIsUserLogged);
  let boolStorageIsUserLogged = storageIsUserLogged === "true";
  console.log("boolStorageIsUserLogged: ", boolStorageIsUserLogged);
  const setUserState = userStore((state) => state.setUserState);

  if (boolStorageIsUserLogged) {
    setUserState(boolStorageIsUserLogged);
  }

  const userInfo = userInfoStore((state) => state.userInfo);
  const diarioId = diarioStore((state) => state.diarioId);
  const setDiarioId = diarioStore((state) => state.setDiarioId);

  let storageUserId = localStorage.getItem("userId");
  let storageUsername = localStorage.getItem("username");
  let storageEmail = localStorage.getItem("email");

  const navigate = useNavigate();
  useEffect(() => {
    let storageUserId = localStorage.getItem("userId");

    api
      .get(`diarios/diarios?userId=${storageUserId}`)
      .then((response) => {
        setNotes(response.data);
        setIsNotesEmpty(response.data.length === 0);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, [storageUserId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "yyyy-MM-dd");
  };

  const navigateWithParams = (param1) => {
    setDiarioId(param1);
    navigate(`/diary/${param1}`);
  };

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

  const diario = {
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
    fontWeight: "bold",
    textAlign: "center",
    padding: "5px",
  };

  let content;
  // console.log(userInfo);
  // console.log(userInfo.id);
  // console.log("User State: ", userState);
  // console.log("Local Storage test:");
  // console.log(storageUserId);
  // console.log(storageUsername);
  // console.log(storageEmail);

  if (boolStorageIsUserLogged === false) {
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
          <img
            src="src/assets/image1.png"
            alt="note2note logo"
            style={{ marginBottom: "20px" }}
          />
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
  } else {
    content = (
      <Section>
        <div style={diarios}>
          {notes.map((elements, index) => (
            <div
              key={index}
              style={diario}
              onClick={() => {
                navigateWithParams(elements?.id);
              }}
            >
              <p style={diarioTitulo}>{elements?.diarioNome}</p>
              <p style={{ textAlign: "center", color: "gray" }}>
                {elements?.diarioDescricao}
              </p>
              <p style={{ textAlign: "center" }}>
                {formatDate(elements?.createdAt)}
              </p>
            </div>
          ))}
        </div>
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
