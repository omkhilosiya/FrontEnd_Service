// src/api/authService.js
import { axiosPrivate } from "./useAxiosPrivate";

/**
 * Logout user
 * @param {string} username
 */
export const logoutUser = async (username) => {
  try {
    await axiosPrivate.post("/user/logout", {
      username,
    });

    // clear local storage
    localStorage.clear();

    return true;
  } catch (error) {
    console.error("Logout failed", error);
    throw error;
  }
};
