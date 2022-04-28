const express = require('express');
const { Client } = require('pg');
const cors = require("cors");
const login_register = require("./components/login_register");

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(cookieParser());
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

app.use(session({
  key: "userId",
  secret: "secret", // change it later
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 60 * 60 * 1000 // cookie session will last 1 hour
  }
}))

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

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({
      loggedIn: true, 
      user: req.session.user.rows[0].username
    })
  } else {
    res.send({ loggedIn: false })
  }
})

app.get("/logout", (req, res) => {
  if(req.session.user) {
    req.session.destroy((err) => {
      res.send(err);
    });
  }
})

app.post("/login", (req, res) => { 
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

app.listen(3001, () => {
  console.log("running on port 3001");
})