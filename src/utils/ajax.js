import axios from "axios";

export default async function ajax(options) {
  axios.defaults.withCredentials = true;
  const init = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    headers: { authorization: '' },
    timeout: 50000,
    responseType: "json",
    data: options.data || {},
    method: options.type || "POST",
  });

  init.interceptors.request.use((params) => {
    return params;
  });
  init.interceptors.response.use(
    (respones) => {
      if (respones.status === 200) {
        let res = respones.data;
        if (res.status === 1) {
          return respones.data;
        } else if (res.status === 6) {
          return respones.data;
        } else {
          if (res.message) {
          }
          return respones.data;
        }
      }
    },
    (error) => {
      console.log(error);
      return false;
    }
  );
  return init(options);
}
