const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

const robloxProxy = createProxyMiddleware({
    target: 'https://roblox.com',
    changeOrigin: true,
    router: {
        '/catalog': 'https://catalog.roblox.com',
        '/games': 'https://games.roblox.com',
        '/groups': 'https://groups.roblox.com',
        '/users': 'https://users.roblox.com',
    },
    pathRewrite: {
        '^/catalog': '', 
        '^/games': '',
        '^/groups': '',
        '^/users': '',
    },
    onProxyReq: (proxyReq) => {
        // حل مشكلة 403 Forbidden
        proxyReq.setHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    }
});

app.use('/', robloxProxy);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy is running on port ${PORT}`));
