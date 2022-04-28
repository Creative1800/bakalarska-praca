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

router.get("/", (req, res) => {
  if (req.session.user) {
    res.send({
      loggedIn: true, 
      user: req.session.user.rows[0].username
    })
  } else {
    res.send({ loggedIn: false })
  }
})

router.delete("/", (req, res) => {
  if(req.session.user) {
    req.session.destroy((err) => {
      res.send(err);
    });
  }
})

router.post("/", (req, res) => { 
  const username = req.body.username;
  const password = req.body.password;
  
  client.query(
    `SELECT * FROM students WHERE 
    username = '${username}';`, 
    (err, result) => {
      if (err) {
        res.send({err: err });
      }
      
      if (result.rowCount > 0) {
        bcrypt.compare(password, result.rows[0].password, (error, response) => {
          if (response) {
            req.session.user = result;
            res.send(result.rows[0].username);
          } else {
            res.send({ message: "Zlé meno alebo heslo!"});
          }
        })
      } else {
        res.send({ message: "Používateľ s týmto menom neexistuje!"});
      }
    }) 
})

client.end;

module.exports = router