const express = require('express');
const parseUrl = require('body-parser');
const app = express();
const mysql = require('mysql');

let encodeUrl = parseUrl.urlencoded({ extended: false });

let con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'regform'
});

app.use(express.static(__dirname + '/src'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/register.html');
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/register.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});


app.post('/register', encodeUrl, (req, res) => {
    let fullName = req.body.fullName;
    let email = req.body.email;
    let password = req.body.password;

    con.connect(function(err) {
        if (err) {
            console.log(err);
        }
        // prüfen ob der benutzer schon da ist
        con.query(`SELECT * FROM azubi WHERE name = '${fullName}' AND password = '${password}'`, function(err, result) {
            if (err) {
                console.log(err);
            }
            if (Object.keys(result).length > 0) {
                res.sendFile(__dirname + '/failReg.html');
            } else {
                // neuen benutzer anlegen
                let sql = `INSERT INTO azubi (name, email, password) VALUES ('${fullName}', '${email}', '${password}')`;
                con.query(sql, function(err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.sendFile(__dirname + '/passReg.html');
                    }
                });
            }
        });
    });
});

app.listen(4000, () => {
    console.log('Server läuft auf port 4000');
});