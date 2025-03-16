export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateToken();

   // Set Cookie
   res.cookie("admin", token, {
    httpOnly: true, // Prevent client-side access to the cookie
    sameSite: "strict", // Prevent CSRF attacks
    expires: new Date(Date.now() + Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000),
  });

  res.status(statusCode).json({
    success: true,
    message,
    user,
    token,
  });
};
