export const catchAsyncErrors = (fn) => (req, res, next) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
