// Simple in-memory cache middleware
const cache = (duration = 60) => {
  const cacheStore = {};
  
  return (req, res, next) => {
    const key = req.originalUrl;
    const cachedResponse = cacheStore[key];
    
    if (cachedResponse && (Date.now() - cachedResponse.timestamp < duration * 1000)) {
      return res.json(cachedResponse.data);
    }
    
    // Override res.json to cache the response
    const originalJson = res.json;
    res.json = function(data) {
      cacheStore[key] = {
        data: data,
        timestamp: Date.now()
      };
      originalJson.call(this, data);
    };
    
    next();
  };
};

module.exports = cache;
