const express = require('express');
const path = require('path'); 

const app = express();
const port = process.env.PORT || 3000;

const DIST_DIR = path.join(__dirname, '/dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');
const FAV_ICON = path.join(DIST_DIR, '/public/favicon.ico');
const MANIFEST = path.join(DIST_DIR, '/public/manifest.json');
app.use(express.static(DIST_DIR));
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
    res.sendFile(HTML_FILE);
});
app.get('/home', (req, res) => {
    res.sendFile(HTML_FILE);
});
app.get('/timer', (req, res) => {
    res.sendFile(HTML_FILE);
});
app.get('/public/favicon.ico', (req, res) => {
    res.sendFile(FAV_ICON);
});
app.get('/public/manifest.json', (req, res) => {
    res.sendFile(MANIFEST);
});

app.listen(port, function () {
    console.log('App listening on http://localhost:' + port);
});