const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser');
const { urlencoded } = require('express');
const sqlite3 = require('sqlite3').verbose();
let alert = require('alert'); 

const PORT = process.env.PORT || 5000;


// set static folder
app.use(express.static(path.join(__dirname, "public")))

let path_db        = (   __dirname   +   '/data.db'                       );

app.use(bodyParser.urlencoded({
    extended: false
 }));
 
 app.use(bodyParser.json());

app.listen(PORT, () => console.log("Server is listening on port " + PORT))

app.use(express.json())
app.use(express.urlencoded())

app.get('/', function(req, res, next) {
    res.send("Hello world");
    res.render("form")
    res.sendFile("index.html");
});

app.post('/' ,function(req,res){
    var name = req.body.name;
    var email = req.body.email;
    var tlf = req.body.tlf;
    var web = req.body.web;
    let db = new sqlite3.Database(":memory:", sqlite3.OPEN_READWRITE, (err) => {
        if(err) {
            console.error(err.message);
        }
        db.exec("CREATE TABLE IF NOT EXISTS contact_form (name VARCHAR(255), email VARCHAR(255), tlf VARCHAR(255), web VARCHAR(255))")
        console.log('Connected to Database!');
    });
    db.run('INSERT INTO contact_form(name, email, tlf, web) VALUES(?, ?, ?, ?)', [name, email, tlf, web], (err) => {
            if (err) {
                console.log(err.message);
            }
            console.log('Good!')
            alert("Formulario enviado, gracias")
            res.redirect('back');
        });
    db.close();
});
