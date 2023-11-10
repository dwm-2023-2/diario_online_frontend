import axios from "axios";

const api = axios.create({
  baseURL: "http://52.87.94.153:8080",
});

export default api;
