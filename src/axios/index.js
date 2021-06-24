import axios from "axios";

export default axios.create({
  baseURL: "http:/localhost:5000",
});

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;
