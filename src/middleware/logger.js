const logger = (req, res, next) => {
  const time = new Date().toLocaleString();
  console.log("Time of request: " + time);
  console.log("Req method: " + req.method);
  console.log("Url of the request: " + req.url);
  next();
};
export default logger;
