const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodeData;

    // if token exists
    if (token && isCustomAuth) {
      decodeData = jwt.verify(token, SECRET);

      req.userId = decodeData?.id;
    } else {
      decodeData = jwt.decode(token);

      req.userId = decodeData?.sub;
    }

    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports = auth;
