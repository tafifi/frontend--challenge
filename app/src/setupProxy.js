const proxy = require('proxy-middleware');

// Fix CORS issue by using proxy middleware
module.exports = app => {
  app.use("/news", proxy("https://api.aylien.com/news"));
};
