import { Header } from "../layout/Header";
import { Section } from "../layout/Section";
import { Footer } from "../layout/Footer";
import { Typography } from "@mui/material";

export const Home = () => {
  return (
    <div>
      <Header></Header>
      <Section>
        <Typography>Home</Typography>
      </Section>
      <Footer></Footer>
    </div>
  );
};
