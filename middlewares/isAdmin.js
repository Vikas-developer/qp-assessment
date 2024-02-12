const isAdmin = (req, res, next) => {
  const { headers } = req;
  const { role } = headers;
  if (role !== process.env.ADMIN || role === undefined) {
    res.status(401).send("Unauthorized");
    return;
  }
  next();
};

module.exports = isAdmin;
