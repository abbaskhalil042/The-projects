import jwt from "jsonwebtoken";
export const generateToken = (userId, res) => {
  const token = jwt.sign({id:userId}, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,//prevent xss attacks
    sameSite:true,//prevent csrf attacks
    maxAge: 30 * 24 * 60 * 60 * 1000,//ms

    secure: process.env.NODE_ENV !== "development",

  });

  return token
};
