import jwt from 'jsonwebtoken';

const newAuth = (roles) => {
  return (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: "Access is denied..." });

    try {
      const verified = jwt.verify(token.split(" ")[1], "shyam");  // "Bearer <token>"
      req.user = verified;

      // Role-based access
      if (!roles.includes(req.user.role))
        return res.status(401).json({ message: "Access is denied..." });

      next();
    } catch (error) {
      res.status(401).json({ message: "invalid token" });
    }
  };
};

export default newAuth;
