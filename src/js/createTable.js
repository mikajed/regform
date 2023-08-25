const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'testinflow'
});

con.connect(function(err) {
    if (err) throw err;
    console.log('Verbunden!');
    // const sql = 'CREATE TABLE azubi (name VARCHAR(255), adresse VARCHAR(255))';
    const sql = 'ALTER TABLE azubi ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY';
    con.query(sql, function (err, result) {
        if (err) throw err;
        // console.log('Tabelle erzeugt!');
        console.log('Tabelle verändert!');
    });
});