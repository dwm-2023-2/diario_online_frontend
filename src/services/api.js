import axios from "axios";

const api = axios.create({
  baseURL: "http://api-svc:8080",
});

export default api;
