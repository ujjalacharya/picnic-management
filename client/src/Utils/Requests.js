import axios from "axios";
import jwt from "jsonwebtoken";
import setAuthToken from "./setAuthToken";
const JWT_SECRET = process.env.REACT_APP_JWT_SECRET;

export const signUp = user => axios.post("/signup", user);

export const signIn = user => axios.post("/signin", user);

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data.data));
    setAuthToken(isAuthenticated().token);
    next();
  }
};

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

export const getUsername = () => {
  if (typeof window !== "undefined") {
    let { teacher } = JSON.parse(localStorage.getItem("jwt"));
    return teacher.firstname;
  }
};

export const signout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
  }
  return true;
};
