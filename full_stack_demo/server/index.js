const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require("cors");

app.use(cors());
app.use(express.json());


// build connection to mysql
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "your password",
    database: "employeeSystem"
});

app.post("/create", (req, res) => {
    const name = req.body.name;
    const age = req.body.age
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;    
    
    // write data into database
    db.query(
        "INSERT INTO employee (name, age, country, position, wage) VALUES (?, ?, ?, ?, ?)",
        [name, age, country, position, wage],
        (err, result) => {
            if(err) {
                console.log(err);
            } else {
                res.send("Values Inserted!")
            }
        }
    );
});

// The first thing to do is to open the server's ears!
app.listen(3001, () => {
    console.log("The server is running on port 3001")
})