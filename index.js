const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

app.use('/:api', (req, res, next) => {
    const api = req.params.api;
    createProxyMiddleware({
        target: `https://${api}.roblox.com`,
        changeOrigin: true,
        pathRewrite: { [`^/${api}`]: '' },
        onProxyReq: (proxyReq) => {
            // السطر الذي سيحل مشكلة 403 للأبد
            proxyReq.setHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
        }
    })(req, res, next);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

app.use('/:api', (req, res, next) => {
    const api = req.params.api;
    createProxyMiddleware({
        target: `https://${api}.roblox.com`,
        changeOrigin: true,
        pathRewrite: { [`^/${api}`]: '' },
        onProxyReq: (proxyReq) => {
            // السطر الذي سيحل مشكلة 403 للأبد
            proxyReq.setHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
        }
    })(req, res, next);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
