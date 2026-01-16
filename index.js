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
            // هذا السطر هو الحل لخطأ 403
            proxyReq.setHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
        },
        onError: (err, req, res) => {
            res.status(500).send('Proxy Error');
        }
    })(req, res, next);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Proxy is active on port ${PORT}`);
});
