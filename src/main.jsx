import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Signup } from "./pages/Singup";
import { Login } from "./pages/Login";
import { CreateDiary } from "./pages/CreateDiary";
import { CreateANote } from "./pages/CreateANote";
import { Profile } from "./pages/Profile";
import { DiaryPage } from "./pages/DiaryPage";
import { RegDiaryPage } from "./pages/RegDiaryPage";
import { EditDiary } from "./pages/EditDiary";
import "./index.css";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <Router>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route exact path="/create-diary" element={<CreateDiary />} />
      <Route exact path="/diary/:param1" element={<DiaryPage />} />
      <Route exact path="/create-note" element={<CreateANote />} />
      <Route exact path="/reg_diary/:param1" element={<RegDiaryPage />} />
      <Route exact path="/edit_diary/:param1" element={<EditDiary />} />
    </Routes>
  </Router>
);
