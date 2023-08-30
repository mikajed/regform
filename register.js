const express = require('express');
const parseUrl = require('body-parser');
const mysql = require('mysql');
const app = express();

const encodeUrl = parseUrl.urlencoded({ extended: false });

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'regform'
});

// pfad für die dateien und unterordner, ohne wird die CSS z.B. nicht geladen
app.use(express.static(__dirname + '/src'));

// pfade für de registrier- und die login-seite
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/register.html');
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/register.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.post('/register', encodeUrl, async (req, res) => {
    const fullName = req.body.fullName;
    const email = req.body.email;
    const password = req.body.password;

    try {
        await connectToDatabase(con);

        const userExists = await checkUserExistence(con, fullName, password);

        if (userExists) {
            res.sendFile(__dirname + '/failReg.html');
        } else {
            await createUser(con, fullName, email, password);
            res.sendFile(__dirname + '/passReg.html');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Fehler');
    }
});

async function connectToDatabase(connection) {
    return new Promise((resolve, reject) => {
        connection.connect(err => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

// checken ob der nutzer schon existiert
async function checkUserExistence(connection, fullName, password) {
    const query = `SELECT * FROM azubi WHERE name = '${fullName}' AND password = '${password}'`;

    return new Promise((resolve, reject) => {
        connection.query(query, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(Object.keys(result).length > 0);
            }
        });
    });
}

// nutzer in der db anlegen
async function createUser(connection, fullName, email, password) {
    const query = `INSERT INTO azubi (name, email, password) VALUES ('${fullName}', '${email}', '${password}')`;

    return new Promise((resolve, reject) => {
        connection.query(query, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

const port = 4000;
app.listen(port, () => {
    console.log(`Server läuft auf ${port}`);
});
