import axios from "axios";

const instance = axios.create({
  baseURL: "https://whatsapp-44.herokuapp.com",
  // baseURL: "http://localhost:9000",
});

export default instance;
