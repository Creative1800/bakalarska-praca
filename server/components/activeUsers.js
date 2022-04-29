const express = require("express");
const router = express.Router();
const { Client } = require('pg');

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "Database",
  password: "password",
  port: 5432
});

client.connect();

router.post("/", (req, res) => {
  client.query(`SELECT username FROM students WHERE virtual_room =${req.body.id}`,
  (error, response) => {
    res.send(response.rows)
  })
})



router.post("/1", (req, res) => {
  client.query(`UPDATE students 
    SET virtual_room = ${req.body.vRoomId} 
    WHERE username = '${req.body.user}'`,
  (error, response) => {
    res.send(response)
  })
})

client.end;

module.exports = router