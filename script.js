const game = function() {
    gameInfo.getPlayers();
    gameInfo.gameStart();
}

//variables for HTML elements
playersTurn = document.getElementById('playersTurn')
playerBtn = document.getElementById('start');
playerBtn.addEventListener('click', game)

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
        gameInfo.gameStart();
    }, 
    gameStart: function() {
        if(gameInfo.turn === '' || gameInfo.turn === 'player2'){
            playersTurn.innerHTML = 'player 1\'s turn'
            gameInfo.turn = "player1"; 
        } else if(gameInfo.turn === '' || gameInfo.turn === 'player1') {
            playersTurn.innerHTML = 'player 2\'s turn'
           gameInfo.turn = "player2";
        }
    }
}

//automatically creates board, allows access to the array of all the divs on the board
const gameBoard = (() => {
    const squares = document.getElementsByClassName('square')
    const gameboard = [];
    console.log(squares)
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
    for (let i = 0; i <squares.length; i++) {  //loops through node-list
        squares[i].addEventListener('click', gameInfo.mark); 
        gameboard.push(squares[i])
    };
})();

//factory used to create players earlier
const playerFactory = (name) => {
    moves = 0
    const sayHello = () => console.log(`hello ${name}`)
    return {name, moves, sayHello};
};
