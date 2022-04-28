const express = require('express');
const cors = require("cors");


const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const loginRoute = require("./components/login");
const registerRoute = require("./components/register");
const virtualroomRoute = require("./components/virtual_room");

const app = express();

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "DELETE"],
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

app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/virtualrooms", virtualroomRoute);

app.listen(3001, () => {
  console.log("running on port 3001");
})