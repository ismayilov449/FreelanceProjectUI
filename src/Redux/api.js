import axios from "axios";
import { getToken } from "./Utils/auth.utils";
import AxiosWithInterceptor from "./Utils/axios.interceptor.utils";
import Axios from "axios";

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
    getCurrentUser: async () => {
      var token = {
        Token: getToken(),
      };
      console.log(token);
      return await axios
        .post(`/api/auth/getcurrentuser`, token, options())
        .then((res) => res.data);
    },
  },
  //############
  //### home ###
  //############
  home: {},
  //############
  //### jobs ###
  //############
  jobs: {
    getall: async (offset, limit) => {
      return await AxiosWithInterceptor.get(
        `/api/job/getall?&offset=${offset}&limit=${limit}`,
        options()
      ).then((res) => res.data);
    },
    post: async (requestData) => {
      return await AxiosWithInterceptor.post(
        `/api/job`,
        requestData,
        options()
      ).then((res) => res.data);
    },
    fullSearch: async (requestData) => {
      return await AxiosWithInterceptor.post(
        `/api/job/getfullsearch`,
        requestData,
        options
      );
    },
  },
  //############
  //### city ###
  //############
  city: {
    getall: async () => {
      return await AxiosWithInterceptor.get(
        `/api/city/getall?&offset=${0}&limit=${100}`,
        options()
      ).then((res) => res.data);
    },
    getallpaging: async (offset, limit) => {
      return await AxiosWithInterceptor.get(
        `/api/city/getall?&offset=${offset}&limit=${limit}`,
        options()
      ).then((res) => res.data);
    },
  },
  //############
  //### category ###
  //############
  category: {
    getall: async () => {
      return await AxiosWithInterceptor.get(
        `/api/category/getall?&offset=${0}&limit=${100}`,
        options()
      ).then((res) => res.data);
    },
    getallpaging: async (offset, limit) => {
      return await AxiosWithInterceptor.get(
        `/api/category/getall?&offset=${offset}&limit=${limit}`,
        options()
      ).then((res) => res.data);
    },
  },
  //############
  //### education ###
  //############
  education: {
    getall: async () => {
      return await AxiosWithInterceptor.get(
        `/api/education/getall?&offset=${0}&limit=${100}`,
        options()
      ).then((res) => res.data);
    },
    getallpaging: async (offset, limit) => {
      return await AxiosWithInterceptor.get(
        `/api/education/getall?&offset=${offset}&limit=${limit}`,
        options()
      ).then((res) => res.data);
    },
  },
  subscription: {
    subscribejob: async (requestData) => {
      var innerFilter = {
        filters: requestData,
      };

      var data = {
        token: getToken().toString(),
        filter: innerFilter,
      };

      return await AxiosWithInterceptor.post(
        `/api/Subscription/SubscribeJob`,
        data,
        options()
      ).then((res) => res.data);
    },
  },
};
