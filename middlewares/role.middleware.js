// middlewares/role.middleware.js

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user || !allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: 'Access denied: Unauthorized role' });
    }

    next();
  };
};

module.exports = { authorizeRoles };
