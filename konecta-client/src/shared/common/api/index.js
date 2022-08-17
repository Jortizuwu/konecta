import axios from "axios";

export const cafeteriaApi = axios.create({
  baseURL: "http://localhost/konecta/",
});
