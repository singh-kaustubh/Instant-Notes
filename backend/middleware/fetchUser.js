import jwt from "jsonwebtoken";
const JWT_SEC = process.env.SECRET_KEY_JWT;
const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send("Please authenticate before using");
  }
  try {
    const data = jwt.verify(token, JWT_SEC);
    req.user = data.user;
    next();
  } catch (err) {
    res.status(401).send("Please use a valid authentication token!");
  }
};
export default fetchUser;
