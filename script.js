const game = function() {
    if(gameInfo.players.length >= 1) return;
    gameInfo.getPlayers();
    gameInfo.gameStart();
    btnContainer.removeChild(startGameBtn);
}

const btnContainer = document.getElementById('container');
let startGameBtn = document.createElement('button');
startGameBtn.innerText = "Start";
btnContainer.appendChild(startGameBtn);


//variables for HTML elements
playersTurn = document.getElementById('playersTurn')
playerBtn = document.getElementById('start');
startGameBtn.addEventListener('click', game)

/* ----------contents of game----------

-array w/ players
- whos turn
-function to create players
- functino create x or o
- function to start game
*/

const gameInfo = {
    players: [],
    turn: '',
    getPlayers: function() {
        const player1 = playerFactory(prompt('player 1'));
        const player2 = playerFactory(prompt("player 2"));
        gameInfo.players.push(player1);
        gameInfo.players.push(player2);
    },
    mark: function(event){
        if(gameInfo.players.length < 1) return;
        if (event.target.innerHTML !== ''){
             alert('choose a blank space'); 
             return;
        }
        if(gameInfo.turn === "player1") event.target.innerHTML = 'X';
        if(gameInfo.turn === "player2") event.target.innerHTML = 'O';
        setTimeout(function(){
            gameInfo.checkWin();
        }, 1);
        setTimeout(function(){
            gameInfo.gameStart();
        }, 1);
        
    }, 
    gameStart: function() {
        
        if(gameInfo.turn === '' || gameInfo.turn === 'player2'){
            playersTurn.innerHTML = 'player 1\'s turn'
            gameInfo.turn = "player1"; 
        } else if(gameInfo.turn === '' || gameInfo.turn === 'player1') {
            playersTurn.innerHTML = 'player 2\'s turn'
           gameInfo.turn = "player2";
        }
    },
    checkWin: function() {
        if([gameBoard.gameboard[0].innerHTML,gameBoard.gameboard[1].innerHTML,gameBoard.gameboard[2].innerHTML].join('') === 'XXX'
        || [gameBoard.gameboard[0].innerHTML,gameBoard.gameboard[3].innerHTML,gameBoard.gameboard[6].innerHTML].join('') === 'XXX'
        || [gameBoard.gameboard[0].innerHTML,gameBoard.gameboard[4].innerHTML,gameBoard.gameboard[8].innerHTML].join('') === 'XXX'
        || [gameBoard.gameboard[1].innerHTML,gameBoard.gameboard[4].innerHTML,gameBoard.gameboard[7].innerHTML].join('') === 'XXX'
        || [gameBoard.gameboard[2].innerHTML,gameBoard.gameboard[5].innerHTML,gameBoard.gameboard[8].innerHTML].join('') === 'XXX'
        || [gameBoard.gameboard[2].innerHTML,gameBoard.gameboard[4].innerHTML,gameBoard.gameboard[6].innerHTML].join('') === 'XXX'
        || [gameBoard.gameboard[3].innerHTML,gameBoard.gameboard[4].innerHTML,gameBoard.gameboard[5].innerHTML].join('') === 'XXX'
        || [gameBoard.gameboard[6].innerHTML,gameBoard.gameboard[7].innerHTML,gameBoard.gameboard[8].innerHTML].join('') === 'XXX'
        || [gameBoard.gameboard[0].innerHTML,gameBoard.gameboard[1].innerHTML,gameBoard.gameboard[2].innerHTML].join('') === 'OOO'
        || [gameBoard.gameboard[0].innerHTML,gameBoard.gameboard[3].innerHTML,gameBoard.gameboard[6].innerHTML].join('') === 'OOO'
        || [gameBoard.gameboard[0].innerHTML,gameBoard.gameboard[4].innerHTML,gameBoard.gameboard[8].innerHTML].join('') === 'OOO'
        || [gameBoard.gameboard[1].innerHTML,gameBoard.gameboard[4].innerHTML,gameBoard.gameboard[7].innerHTML].join('') === 'OOO'
        || [gameBoard.gameboard[2].innerHTML,gameBoard.gameboard[5].innerHTML,gameBoard.gameboard[8].innerHTML].join('') === 'OOO'
        || [gameBoard.gameboard[2].innerHTML,gameBoard.gameboard[4].innerHTML,gameBoard.gameboard[6].innerHTML].join('') === 'OOO'
        || [gameBoard.gameboard[3].innerHTML,gameBoard.gameboard[4].innerHTML,gameBoard.gameboard[5].innerHTML].join('') === 'OOO'
        || [gameBoard.gameboard[6].innerHTML,gameBoard.gameboard[7].innerHTML,gameBoard.gameboard[8].innerHTML].join('') === 'OOO'
        ) {
            alert(`${gameInfo.turn} you win!`)
            setTimeout(function(){
                gameInfo.reset();
            }, 1);
            
            
        }
    },
    reset: function() {
        gameBoard.gameboard.forEach(function(square) {
            square.innerHTML = ''
        });
        turn = ''
        gameInfo.players = []
        playersTurn.innerHTML = ''
        btnContainer.appendChild(startGameBtn);

    }
}
/* factory used to create players earlier */
const playerFactory = (name) => {
    moves = 0
    const sayHello = () => console.log(`hello ${name}`)
    return {name, moves, sayHello};
};
/* automatically creates board, allows access to the array of all the divs on the board */
const gameBoard = (() => {
    const gameboard = [];
    let square = document.createElement('div');
    square.classList.add('square');
    square.style.height = "50px";
    square.style.width = "50px";
    square.style.background = "green";  
    square.style.border = "2px solid black";  
    document.getElementById("grid").style.gridTemplateColumns = `repeat(3, 1fr)`; 
    for(i=0; i<9; i++) {
        grid.appendChild(square.cloneNode(true)); 
    };
    const squares = document.getElementsByClassName('square')
    for (let i = 0; i <squares.length; i++) {  //loops through node-list
        squares[i].addEventListener('click', gameInfo.mark); 
        gameboard.push(squares[i])
    };
    return {gameboard}
})();



