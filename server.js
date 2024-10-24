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
    console.log(id);
    
    let state = activeSessions[id]; //gamestate
    res.send({gameState: state})
    
   
  })


  server.post('/guess', (req,res) =>{

    let id = req.body.sessionID
    let guess = req.body.guess
    let gameState =  activeSessions[id];
    let guessArr = guess.split("");
    let answerArr = gameState.wordToGuess.split("");
    for(let i =0; i<wordArr.length; i++){
      if(guessArr[i]!=answerArr[i]){
        //wrong
      } else if(answerArr[i]==guessArr[i+1]){
        //close
      } else if(answerArr[i]==guessArr[i]){
        //right
      }


    }


  })
  // res.send('Hello World!')




//Do not remove this line. This allows the test suite to start
//multiple instances of your server on different ports
module.exports = server;