const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
});

con.connect(function(err) {
    if (err) throw err;
    console.log('Verbunden!');
    con.query('CREATE DATABASE testinflow', function (err, result) {
        if (err) throw err;
        console.log('Database created');
    });
});