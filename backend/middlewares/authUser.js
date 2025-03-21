const jwt = require("jsonwebtoken");

const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized Login again",
      });
    }

    const token_decode = await jwt.verify(token, process.env.JWT_SECRET);

    req.body.userId = token_decode.id;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = authUser;
