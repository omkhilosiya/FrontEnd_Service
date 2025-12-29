import { axiosPrivate } from "../../api/useAxiosPrivate";

export const getAgents = (search = "") => {
  return axiosPrivate.get("/agent", {
    params: search ? { search } : {},
  });
};

