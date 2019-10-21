if (typeof window === 'undefined') {
    global.window = {};
}

const fs = require('fs');
const path = require('path');
const express = require('express');
const { renderToString } = require('react-dom/server');
const SSR = require('../dist/search-server.js');
const template = fs.readFileSync(path.join(__dirname, '../dist/search.html'), 'utf-8');

const server = (port) => {
    let app = express();

    app.use(express.static('dist'));
    app.get('/src/page/search', (req, res) => {
        let html = renderMakeup(renderToString(SSR));
        res.status(200).send(html);
    });

    app.listen(port, () => {
        console.log("Server is running on port:", port);
    });
};

server(process.env.PORT || 3000);

const renderMakeup = (data) => {
    return template.replace('<!--HTML_PLACEHOLDER-->', data);
};