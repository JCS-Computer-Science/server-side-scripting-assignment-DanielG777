const express = require("express");
const uuid = require("uuid")
const server = express();
server.use(express.json())

server.use(express.static('public'))
//All your code goes here
let activeSessions={

}
server.get('/newgame', (req, res) => {
  let newId = uuid.v4();
  console.log(newId);
  
  let newGame = {
    wordToGuess: "apple", 
    guesses:[

    ],
    wrongLetters: [],
    closeLetters: [],
    rightLetters: [],
    remainingGuesses: 6,
    gameOver: false
}
activeSessions[newId] = newGame;
res.status(201)

res.send({
  sessionID: newId
})
})


  server.get('/gamestate',(req,res) =>{
    let id = req.query.sessionID;
    let state= activeSessions[id];
    res.send({gameState: state})
  })
  // res.send('Hello World!')




//Do not remove this line. This allows the test suite to start
//multiple instances of your server on different ports
module.exports = server;