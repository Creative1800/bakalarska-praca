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

/* router.post("/", (req, res) => {
  console.log(req.body.questionIds)
  client.query(
    `SELECT question_content
    FROM questions 
    WHERE id IN (${req.body.questionIds})`,
  (error, response) => {
    console.log(response)
    console.log(error)

  })
}) */

router.post("/", (req, res) => {
  //console.log(req.body)
  client.query(`SELECT * FROM virtual_rooms WHERE id = ${req.body.id}`, 
  (error, response) => {
    if(response) {
      const questionContent = getQuestionsContent(res, response.rows[0].questions)
    }
    //res.send(response.rows[0].questions)
  })
})

const getQuestionsContent = (res, questionIds) => {
  let returnData = ''
  client.query(
    `SELECT question_content
    FROM questions 
    WHERE id IN (${
      questionIds.map(item => {
        return (item)
      })
    })`,
  (error, response) => {
    console.log("tu", response.rows)
    res.send(response.rows)
  })

}

const map = (data) => {
  const Items = data.map(item => {
    return (item)
  })
  return Items
}



/* router.post("/", (req, res) => {
  client.query(`INSERT INTO questions (question_content)
  VALUES('{
    "type":"text",
    "content":{
      "item":{
        "ques":"vlk",
        "answ":"vlkovy"
      },
      "item":{
        "ques": "vlk",
        "answ":"vlkovy"
      }
    }
  }')`,
  (error, response) => {
    console.log(response, error)
  })
}) */

client.end;

module.exports = router