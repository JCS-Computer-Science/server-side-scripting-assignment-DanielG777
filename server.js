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
    if(id==undefined){
      res.status(400).json({ error: 'No session ID is provided' });
    }
    console.log(id);
    
    let state = activeSessions[id]; //gamestate
    if(state==undefined){
      res.status(404).json({ error: 'No active sessions with this ID' });
    } 
    res.send({gameState: state})
    
   
  })


  server.post('/guess', (req,res) =>{

    let id = req.body.sessionID
    if(id==undefined){
      res.status(400).json({ error: 'No session ID is provided' });
    }
    let guess = req.body.guess
    let game =  activeSessions[id];
    let guessArr = guess.split("");
    if(game==undefined){
      res.status(404).json({ error: 'No active sessions with this ID' });
    }



    let answerArr = game.wordToGuess.split("");
    let newGuess = [];
    
    game.remainingGuesses= game.remainingGuesses-1;

    for(let i = 0; i<guessArr.length; i++){
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
      //  if(newGuess.includes(guessArr[i])) {
      //   game.rightLetters.push(guessArr[i])
      //  }

      } else if(answerArr.includes(guessArr[i])){
        newGuess.push(pushClose)
        game.closeLetters.push(guessArr[i])
      } else {
        newGuess.push(pushWrong)
        game.wrongLetters.push(guessArr[i])
      }
      
    }
    if(game.remainingGuesses==0||guess==game.wordToGuess){
      game.gameOver = true;
    }
    game.guesses.push(newGuess)
    res.status(201)
    res.send({gameState: game})

    
    
  })
  server.delete('/delete', (req,res)=>{
    
  })


//  to run the server: npm run serve


//Do not remove this line. This allows the test suite to start
//multiple instances of your server on different ports
module.exports = server;