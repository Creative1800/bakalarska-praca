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

router.post("/activeusers", (req, res) => {
  client.query(
    `SELECT active_students 
    FROM virtual_rooms 
    WHERE id = ${req.body.id}`, 
  (error, response) => {
    res.send(response)
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

router.post("/activeusers/add", (req, res) => {
  let activeUsers = []
  client.query(
    `SELECT active_students 
    FROM virtual_rooms 
    WHERE id = ${req.body.id}`, 
  (error, response) => {
    activeUsers = response.rows[0].active_students
    
    const isUserInActiveUsers = checkUserInActiveUsers(req.body.username, activeUsers)
    
    console.log(isUserInActiveUsers)
    if(!isUserInActiveUsers) {
      activeUsers.push(req.body.username.toLowerCase())
      client.query(
        `UPDATE virtual_rooms
      set active_students = ARRAY[${activeUsers.map(item => {
        return `'${item}'`
      })}]
      WHERE id = ${req.body.id}`, 
      (err, result) => {
        console.log("tadaa1: ", result)
        //res.send(response)
      })
    }
    //res.send(response)
  })
 
})

router.post("/issent", (req, res) => {
  client.query(
    `UPDATE virtual_rooms
    set is_sent = true
    WHERE id = ${req.body.id}`, 
  (error, response) => {
    console.log(response)
  })
})



const checkUserInActiveUsers = (username, activeUsers) => {
  for(let i = 0; i < activeUsers.length; i++) {
    if(activeUsers[i].toLowerCase() === username.toLowerCase()) return true
  }
  return false
}



client.end;

module.exports = router