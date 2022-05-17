const express = require('express');
const cors = require("cors");
const fileUpload = require('express-fileupload');
const {Server} = require('socket.io')
const http = require('http');


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
const inputFieldRoute = require("./components/inputField");;

const app = express();


const server = http.createServer(app);

const io = new Server(server,{ 
  cors: {
    origin: 'http://localhost:3000'
  }
}) //in case server and client run on different urls

const users = []
const solutionsArray = []
let roomIndex = 0
io.on("connection", (socket) => {
  
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    addUser(data, socket)
    
    socket.join(data.room);

    
    let solutionArray = []  
    for(let i = 0; i < solutionsArray.length ; i++) {
      if(data.room === solutionsArray[i].room) {
        solutionArray = solutionsArray[i].solutionArray
      }
    }
    io.to(data.room).emit("joined", {users, username: data.username, solutionArray});
  });
  
  socket.on("left_room", (data) => {
    removeUser(data)
    socket.to(data.room).emit("joined", {users, username: data.username});
  });

  socket.on('questionChange', (data) => {
    roomIndex = 0
    
    const isEmptied = setSolutionArrayToEmpty(data)
    

    if(isEmptied) {
      socket.to(data.room).emit(
        'questionChanged', 
        {questionData: data , solutionArray: solutionsArray[roomIndex].solutionArray
        })
    } else {
      socket.to(data.room).emit(
        'questionChanged', 
        {questionData: data , solutionArray: []
        })
    }    
  })

  const setSolutionArrayToEmpty = (data) => {
    
    for(roomIndex ; roomIndex < solutionsArray.length; roomIndex++) {
      if(data.room === solutionsArray[roomIndex].room) {
        solutionsArray[roomIndex].solutionArray = []
        return true
      }
    }
    
    return false
  }

  socket.on('showUniversalModal' , data => {
    io.to(data.room).emit('showUniversalModal', data)
  })
  
  socket.on('showModal' , data => {
    io.to(data.room).emit('showModal', data)
  })

  socket.on('inputClick', (data) => {
    socket.to(data.isInputInteracted[data.inputId].room).emit('inputClick', data)
  })
  
  socket.on('picClick', (data) => {
    socket.to(data.isInputInteracted[data.inputId].room).emit('picClick', data)
  })

  socket.on('picArrayChange', (data) => {
    const roomPositionInSolutionArray = searchInSolutionArray(data)
    if(roomPositionInSolutionArray === -1) {
      solutionsArray.push(data)
    } else {
      solutionsArray[roomPositionInSolutionArray] = data 
    }
    socket.to(data.room).emit('picArrayChange', data)
  })
  
  socket.on('inputChange', (data) => {
    const roomPositionInSolutionArray = searchInSolutionArray(data)
    if(roomPositionInSolutionArray === -1) {
      solutionsArray.push(data)
    } else {
      solutionsArray[roomPositionInSolutionArray] = data 
    }
    socket.to(data.room).emit('inputChange', data)
  })

});

const searchInSolutionArray = (data) => {
  for(let i = 0; i < solutionsArray.length ; i++) {
    if(data.room === solutionsArray[i].room) {
      return i
    }
  }
  return -1
} 

const addUser = (data, socket) => {
  for(let i = 0; i < users.length ; i++) {
    if(data.username === users[i].username) {
      return
    }
  } 
  users.push({
    id: socket.id,
    username: data.username,
    room: data.room
  })
}

const removeUser = (data) => {
  let i = 0;
  for(i = 0; i < users.length ; i++) {
    if(data.username === users[i].username) {
      break      
    }
  }
  users.splice(i, 1)
}


var server_port = process.env.YOUR_PORT || process.env.PORT || 5000;
server.listen(server_port, () => {
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