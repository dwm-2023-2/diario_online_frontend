import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.49.2:32263",
});

export default api;
