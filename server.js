const express = require('express');
const nunjucks = require('nunjucks');

const server = express();

const data = require('./public/data');

server.set("view engine", "njk");
server.use(express.static('public'));

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
});

server.get('/', (req, res) => {
    res.render("index", { items: data });
});

server.get('/receitas', (req, res) => {
    res.render("receitas", { items: data });
});

server.get('/sobre', (req, res) => {
    res.render("sobre");
});

server.listen(3333);