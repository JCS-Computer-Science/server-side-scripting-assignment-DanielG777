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
console.log(activeSessions);

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
    let game =  activeSessions[id];
    let guessArr = guess.split("");
    let answerArr = game.wordToGuess.split("");
    let newGuess = [];
    let rightLetters = [];
    let closeLetters = [];
    let wrongLetters = [];
    

    for(let i =0; i<guessArr.length; i++){
      let pushRight = {
        value: guessArr[i], result:"RIGHT",
      }
      let pushClose = {
        value: guessArr[i], result:"CLOSE",
      }
      let pushWrong = {
        value: guessArr[i], result:"WRONG",
      }
      if(guessArr[i]==answerArr[i]){
        newGuess.push(pushRight)
      } else if(guessArr.includes(answerArr[i])){
        newGuess.push(pushClose)
      } else {
        newGuess.push(pushWrong)
      }
        // if(newGuess[result]=="RIGHT"){
        // rightLetters.push(newGuess)
        // }
      
      
    }
    game.guesses.push(newGuess)
    res.send({gameState: game})
    
    console.log(gameState);
    
  })
  // res.send('Hello World!')

//  to run the server: npm run serve


//Do not remove this line. This allows the test suite to start
//multiple instances of your server on different ports
module.exports = server;