const express = require('express');
const nunjucks = require('nunjucks');

const server = express();

const data = require('./data');

server.set("view engine", "njk");
server.use(express.static('public'));

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
});

server.get('/', (req, res) => {
    res.render("index", { items: data });
})

server.listen(3333);