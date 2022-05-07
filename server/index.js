const express = require('express');
const cors = require("cors");
const fileUpload = require('express-fileupload');
const socketIo = require('socket.io')


const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const loginRoute = require("./components/login");
const registerRoute = require("./components/register");
const allVRoomsRoute = require("./components/allVRooms");
const activeUsersRoute = require("./components/activeUsers");
const questionRoute = require("./components/question");
const imagesRoute = require("./components/images");
const VRoomRoute = require("./components/VRoom");
const inputFieldRoute = require("./components/inputField");

const app = express();


var http = require('http').createServer(app);


const io = socketIo(http,{ 
  cors: {
    origin: 'http://localhost:3000'
  }
}) //in case server and client run on different urls

 io.on('connection',(socket)=>{
  console.log('client connected: ',socket.id)

  socket.on('questionChange', (data) => {
    socket.broadcast.emit('questionChange', data)
  })
  
  socket.on('inputClick', (data) => {
    socket.broadcast.emit('inputClick', data)
  })
  
  socket.on('inputChange', (data) => {
    socket.broadcast.emit('inputChange', data)
  })

  socket.on('USER_ONLINE', (data) => {
    //socket.broadcast.emit('USER_ONLINE', data)
    console.log(data)
  })

  socket.on('disconnect',(reason)=>{
      console.log(reason)
  })
  
  
})




var server_port = process.env.YOUR_PORT || process.env.PORT || 5000;
http.listen(server_port, () => {
    console.log("Started on : "+ server_port);
})

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
app.use("/virtualrooms", allVRoomsRoute);
app.use("/activeusers", activeUsersRoute);
app.use("/question", questionRoute);
app.use("/images", imagesRoute);
app.use("/vroom", VRoomRoute);
app.use("/inputfield", inputFieldRoute);

app.listen(3001, () => {
  console.log("running on port 3001");
})