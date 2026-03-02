// Authentication middleware
const protect = async (req, res, next) => {
  // Temporary bypass - to be implemented with JWT later
  console.log('Auth middleware - to be implemented');
  next();
};

const authorize = (...roles) => {
  return (req, res, next) => {
    // Temporary bypass - to be implemented later
    console.log('Authorize middleware - to be implemented', roles);
    next();
  };
};

module.exports = { protect, authorize };
