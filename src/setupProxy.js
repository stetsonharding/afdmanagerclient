const { createProxyMiddleware } = require('http-proxy-middleware');

 

module.exports = function (app) {
  app.use(
    '/afd',
    createProxyMiddleware({
      target: 'https://azuremanagementfd-staging.happyflower-541968ec.westus3.azurecontainerapps.io',
      changeOrigin: true,
    })
  );
};