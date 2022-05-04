const express = require("express");
const router = express.Router();
const { Client } = require('pg');
const fileUpload = require('express-fileupload');

router.use(fileUpload());

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "Database",
  password: "password",
  port: 5432
});


client.connect();

/* router.post('/', (req, res) => {
  console.log(req.files.pic)
  const {name, data} = req.files.pic; */
  /* if (name && data) {
       knex.insert({name: name, img: data}).into('img');
      res.sendStatus(200);
  } else {
      res.sendStatus(400);
  } */
  /* client.query(
    `insert into cards 
    (card_name, img) 
    values('${name}', '${data})`,
    (err, result) => {
      console.log(err)
      console.log(result)
    })
}) */

client.end;

module.exports = router