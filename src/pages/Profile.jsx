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
  return (
    <div>
      <Header></Header>
      <Section>Profile</Section>
      <Footer></Footer>
    </div>
  );
};
