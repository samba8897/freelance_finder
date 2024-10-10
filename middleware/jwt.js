import axios from "axios";
import getCurrentUser from "./getCurrentUser"; // Adjust the path accordingly

const newRequest = axios.create({
  baseURL: "https://prolancer-backend.onrender.com/api/",
  withCredentials: true,
});

newRequest.interceptors.request.use(
  (config) => {
    const currentUser = getCurrentUser();

    
    if (currentUser) {
     
      config.headers.Authorization = `Bearer ${currentUser.token || ''}`; 
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default newRequest;




// import jwt from "jsonwebtoken";
// import createError from "../utils/createError.js";

// export const verifyToken = (req, res, next) => {
//   const token = req.cookies.accessToken;
//   if (!token) return next(createError(401,"You are not authenticated!"))


//   jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
//     if (err) return next(createError(403,"Token is not valid!"))
//     req.userId = payload.id;
//     req.isSeller = payload.isSeller;
//     next()
//   });
// };
