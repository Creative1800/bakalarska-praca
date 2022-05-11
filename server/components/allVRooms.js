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

router.get("/", (req, res) => {
  client.query(`
    SELECT * 
    FROM virtual_rooms 
    ORDER BY id ASC`, 
  (error, response) => {
    res.send(response.rows)
  })
})



client.end;

module.exports = router