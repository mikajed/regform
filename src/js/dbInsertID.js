const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mydb'
});

con.connect(function(err) {
    if (err) throw err;
    const sql = "INSERT INTO azubi (name, adresse) VALUES ('Karate Kid', 'Japanstr 1')";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log('1 Eintrag eingefügt, ID: ' + result.insertId);
    });
});