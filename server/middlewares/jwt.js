import jwt from "jsonwebtoken";
import "dotenv/config";

export const gen_jwt = async (res, user_id) => {
  try {
    const token = jwt.sign({ user_id }, process.env.SECRETE_KEY, {
      expiresIn: "7d",
    });
    res.cookie("auth_token", token, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 60 * 1000,
    });
    return token;
  } catch (error) {
    console.log(error.message);
  }
};

export const verify_jwt = async (req, res, next) => {
  const token = req.cookies.auth_token;
  try {
    if (!token)
      return res
        .status(403)
        .json({ success: false, message: "Invalid or expired signature!" });
    const decoded = jwt.verify(token, process.env.SECRETE_KEY);
    if (!decoded)
      return res
        .status(403)
        .json({ success: false, message: "Invalid or expired signature!" });
    req.user_id = decoded.user_id;
    next();
  } catch (error) {
    console.log(error.message);
  }
};
