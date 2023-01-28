import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    //CHECK HEADER
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(403).json({
        message: "UnAuthorized",
      });
    }
    //VERIFY TOKEN
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.exp) {
      const dateNow = new Date();
      if (decoded.exp * 1000 < dateNow.getTime()) {
        return res.status(401).json({
          message: "Token expired",
        });
      }
    }
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export default verifyToken;
