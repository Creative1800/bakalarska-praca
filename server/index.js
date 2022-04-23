const express = require('express');
const { Client } = require('pg');
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "Database",
  password: "password",
  port: 5432
});



  
client.connect();
app.post("/register", (req, res) => {
  
  const username = req.body.username;
  const password = req.body.password;

  client.query(
    `INSERT INTO students (username, password) 
    VALUES ('${username}','${password}')`), 
    (err, result) => {
      console.log(err);
  } 
})  

app.post("/login", (req, res) => { 
  const username = req.body.username;
  const password = req.body.password;

  client.query(
    `SELECT * FROM students WHERE username = '${username}' 
    AND password = '${password}'`), 
    (err, result) => {
      console.log(username)
      if (err) {
        res.send({err: err});
      }
      
      if (result.length > 0){
        console.log(username)
        res.send(result);
      } else {
        res.send({ message: "Zlé meno alebo heslo!" });
      }
    }
})  
client.end;
 
app.listen(3001, () => {
  console.log("running on port 3001");
}) 