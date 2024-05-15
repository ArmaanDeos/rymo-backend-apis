const generateAccessToken = async (user, statusCode, res) => {
  const accessToken = user.getAccessToken();

  // cookies options
  const options = {
    expiresIn: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.status(200).cookie("token", accessToken, options).json({
    success: true,
    user,
    accessToken,
  });
};

export { generateAccessToken };
