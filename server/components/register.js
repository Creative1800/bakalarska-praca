const express = require("express");
const router = express.Router();
const { Client } = require('pg');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "Database",
  password: "password",
  port: 5432
});

client.connect();

router.post("/", (req, res) => {
  
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) =>{
    if(err) {
      res.send({err: err});
    }

    client.query(
      `INSERT INTO students (username, password) 
      VALUES ('${username}','${hash}')
      ON CONFLICT (username) DO NOTHING`,
      (err, result) => {
        if(result.rowCount > 0){
          res.send({isRegSuccessful: true});
        } else {
          res.send({isRegSuccessful: false});
        }
      } 
    )
  })
})

client.end;

module.exports = router