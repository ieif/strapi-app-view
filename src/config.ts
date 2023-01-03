import axios from "axios";
export default {
   baseUrl: "/",
   server: "http://localhost:80",
   api: (data: { [key: string]: any }) => {
      data.url = /^http/i.test(data.url) ? data.url : "http://localhost:80/" + data.url.replace(/^\/+/, "");
      return axios(data);
   },
};
