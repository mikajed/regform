const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "testinflow"
});

con.connect(function(err) {
    if (err) {
        console.log(`Fehler bei der Verbindung! ${err}`);
    } else {
        console.log('Datenbank verbunden');
    }
});