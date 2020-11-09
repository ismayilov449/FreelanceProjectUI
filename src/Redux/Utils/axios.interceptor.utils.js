import Axios from "axios";
import { getToken, setToken } from "./auth.utils";

Axios.interceptors.request.use(
  (config) => {
    let token = getToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;

    //prevent infinite loop request
    if (
      error &&
      error.response &&
      error.response.status === 401 &&
      originalRequest.url.includes("/account/auth")
    ) {
      console.log("interceptor originalrequest", originalRequest);
      return Promise.reject(error);
    }

    if (
      error &&
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      console.log("interceptor originalrequest", originalRequest);
      originalRequest._retry = true;
      return Axios.post(`/account/auth`, {
        grant_type: "refresh_token",
        // provider_id: getProviderId(),
        // refresh_token: getRefreshToken(),
      }).then((res) => {
        var token = res.data;
        //token.provider_id = getProviderId();
        setToken(res.data);

        return Axios(originalRequest);
      });
    }

    return Promise.reject(error);
  }
);

export default Axios;
