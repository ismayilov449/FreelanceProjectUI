import axios from "axios";
import { getToken } from "./Utils/auth.utils";
import AxiosWithInterceptor from "./Utils/axios.interceptor.utils";

const options = () => ({
  headers: {
    "Content-type": "application/json",
    Authorization: "Bearer " + getToken(),
  },
});

export default {
  //############
  //### auth ###
  //############
  auth: {
    signin: async (data) => {
      return await axios.post(`/api/auth/login`, data);
    },
    signout: async () => {
      const requestData = {
        // refresh_token: getRefreshToken(),
        grant_type: "sign_out",
      };
      return await axios.post(`/api/account/signout`, requestData, {
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      });
    },
  },
  home: {},
  jobs: {
    getall: async (offset, limit) => {
      return await AxiosWithInterceptor.get(
        `/api/job/getall?&offset=${offset}&limit=${limit}`,
        options()
      ).then((res) => res.data);
    },
    getbyid: async (id) => {
      return await AxiosWithInterceptor.get(
        `/api/job/getbyid?&id=${id}`,
        options()
      ).then((res) => res.data);
    },
  },
};
