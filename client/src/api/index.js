import axios from "axios";

const base = {
  get: path => axios.get(`api/${path}`),
  post: (path, data) => axios.post(`api/${path}`, data)
};

export default {
  getChars: () => base.get("characters"),
  ipsums: settings => base.post("ipsums", settings)
};
