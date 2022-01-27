const errorMiddleware = (err, req, res, _next) => {
  const status = err.status || 500;
  res.status(status).end();
};

module.exports = errorMiddleware;
