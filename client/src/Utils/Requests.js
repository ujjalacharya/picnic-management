import axios from "axios";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.REACT_APP_JWT_SECRET;

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }

  let jsontoken = localStorage.getItem("jwt");

  let data;

  if (jsontoken) {
    let { token } = JSON.parse(jsontoken);
    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
      if (err) {
        data = false;
        await signout();
      } else {
        let parsedtoken = JSON.parse(jsontoken);
        data = { ...parsedtoken, user: { ...decoded } };
      }
    });
    return data;
  } else {
    return false;
  }
};

export const signout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");

    return axios.get("/signout");
  }
};
