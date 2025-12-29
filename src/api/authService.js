import { axiosPublic } from "../api/axios";

export const login = (data) => {
  return axiosPublic.post("/signin", data);
};

export const register = (data) => {
  return axiosPublic.post("/signup", data);
};
