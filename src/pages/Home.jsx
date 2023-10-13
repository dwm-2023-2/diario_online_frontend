import { Header } from "../layout/Header";
import { Section } from "../layout/Section";
import { Footer } from "../layout/Footer";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <Header></Header>
      <Section>
        <Typography>Home</Typography>
        <Link to="/login">Login</Link>
        <Link to="/create-diary">Create a Diary</Link>
      </Section>
      <Footer></Footer>
    </div>
  );
};
