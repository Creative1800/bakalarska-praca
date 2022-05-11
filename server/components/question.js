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
  client.query(`SELECT * FROM virtual_rooms WHERE id = ${req.body.id}`, 
  (error, response) => {
    if(response) {
      const questionContent = getQuestionsContent(res, response.rows[0].questions)
    }
  })
})

const getQuestionsContent = (res, questionIds) => {
  client.query(
    `SELECT question_content
    FROM questions 
    WHERE id IN (${
      questionIds.map(item => {
        return (item)
      })
    })`,
  (error, response) => {
    res.send(response.rows)
  })

}

client.end;

module.exports = router