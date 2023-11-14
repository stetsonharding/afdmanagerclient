const { createProxyMiddleware } = require('http-proxy-middleware');



module.exports = function (app) {
  app.use(
    '/afd',
    createProxyMiddleware({
      target: process.env.REACT_APP_AFD_MANAGER_CLIENT_API_BASE_URL,
      changeOrigin: true,
    })
  );
};