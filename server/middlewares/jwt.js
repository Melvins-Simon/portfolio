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
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return token;
  } catch (error) {
    console.log(error.message);
  }
};

export const verify_jwt = (req, res, next) => {
  const token = req.cookies.auth_token;
  const publicRoutes = [
    "/api/send-message",
    "/api/get-messages",
    "/api/signin",
    "/api/signout",
    "/api/get-projects",
    "/api/get-profile",
    "/api/skills",
  ];

  if (publicRoutes.includes(req.path)) {
    return next();
  }

  if (!token) {
    return res.status(401).clearCookie("auth_token").json({
      success: false,
      message: "Not authenticated - please login",
    });
  }

  jwt.verify(token, process.env.SECRETE_KEY, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .clearCookie("auth_token")
        .json({
          success: false,
          message:
            err.name === "TokenExpiredError"
              ? "Session expired - please login again"
              : "Invalid authentication",
          shouldLogout: true,
        });
    }

    req.user_id = decoded.user_id;
    next();
  });
};
