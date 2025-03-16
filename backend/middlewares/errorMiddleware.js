class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error!";
  err.statusCode = err.statusCode || 500;

  // Handle MongoDB duplicate key errors
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered!`;
    err = new ErrorHandler(400, message);
  }

  // Handle invalid JWT token errors
  if (err.name === "JsonWebTokenError") {
    const message = "Invalid JSON Web Token. Please try again!";
    err = new ErrorHandler(400, message);
  }

  // Handle expired JWT token
  if (err.name === "TokenExpiredError") {
    const message = "Your session has expired. Please log in again!";
    err = new ErrorHandler(400, message);
  }

  // Handle Mongoose CastError (invalid ObjectId, etc.)
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(400, message);
  }

  // Handle validation errors from Mongoose
  const errorMessage = err.errors
    ? Object.values(err.errors)
        .map((error) => error.message)
        .join(" ")
    : err.message;

  return res.status(err.statusCode).json({
    success: false,
    message: errorMessage,
  });
};

export default ErrorHandler;
