const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

app.use('/:api', (req, res, next) => {
    const api = req.params.api;
    createProxyMiddleware({
        target: `https://${api}.roblox.com`,
        changeOrigin: true,
        pathRewrite: { [`^/${api}`]: '' },
    })(req, res, next);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
