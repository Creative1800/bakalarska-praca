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
  client.query(
    `SELECT current_question 
    FROM virtual_rooms 
    WHERE id = ${req.body.id}`, 
  (error, response) => {
    res.send(response.rows)
  })
})

router.post("/cq", (req, res) => {
  client.query(
    `UPDATE virtual_rooms 
    SET current_question = ${req.body.currentQuestion} 
    WHERE id = '${req.body.id}'`, 
  (error, response) => {
    if( response.rowCount > 0) {
      client.query(
        `SELECT current_question 
        FROM virtual_rooms 
        WHERE id = ${req.body.id}`, 
        (err, result) => {
          if(result) {
            res.send(result.rows)
          }
      })
    }
  })
})



client.end;

module.exports = router