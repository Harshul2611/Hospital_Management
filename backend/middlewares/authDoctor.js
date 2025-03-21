const jwt = require("jsonwebtoken");

const authDoctor = async (req, res, next) => {
  try {
    const { dtoken } = req.headers;

    if (!dtoken) {
      return res.json({ success: false, message: "Not Authorized login" });
    }

    token_decode = await jwt.verify(dtoken, process.env.JWT_SECRET);
    req.body.docId = token_decode.id;

    next();
  } catch (error) {
    res.json({ success: false, message: "error.message" });
  }
};

module.exports = authDoctor;
