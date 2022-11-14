const express = require('express')
const app = express()
const path = require('path')
const https = require('https');
const http = require('http');

const PORT = process.env.PORT || 5000;


// set static folder
app.use(express.static(path.join(__dirname, "public")))

app.listen(PORT, () => console.log("Server is listening on port " + PORT))
http.createServer(app).listen(80);
https.createServer(options, app).listen(443);

app.get('/', function(req, res, next) {
    res.send("Hello world");
});
