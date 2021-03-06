/* ----- The Game ----- */
const game = function() {
    if(gameInfo.players.length >= 1) return;
    gameInfo.getPlayers();
    gameInfo.round();
    mainContainer.removeChild(startGameBtn);
    mainContainer.appendChild(playersTurn);
}

/* ---- Global Code ----- */
//DOM and HTML elements
let playersTurn = document.getElementById('playersTurn');
let startGameBtn = document.getElementById('startGameBtn');
startGameBtn.innerText = "Start!";
startGameBtn.addEventListener('click', game)

/* ----- Factory: creates players below -----*/
const playerFactory = (name) => {
    moves = 0
    const sayHello = () => console.log(`hello ${name}`)
    return {name, moves, sayHello};
};

/* ----------OBJECT: contents of game----------*/
//-----array w/ players
//-----whos turn
//-----create players function
//-----create x or o marks function
//-----round change function
//-----check win condition function
//-----reset game function

const gameInfo = {
    players: [],
    turn: '',
    counter: 0,
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
            if(gameInfo.checkWin());
        }, 1);
        setTimeout(function(){
            gameInfo.round();
        }, 1);
        gameInfo.counter += 1
        console.log(gameInfo.counter)
    }, 
    round: function() {
        if(gameInfo.turn === '' || gameInfo.turn === 'player2'){
            playersTurn.innerHTML = `${gameInfo.players[0].name}'s Turn`
            gameInfo.turn = "player1"; 
        } else if(gameInfo.turn === '' || gameInfo.turn === 'player1') {
            playersTurn.innerHTML = `${gameInfo.players[1].name}'s Turn`
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
            if(gameInfo.turn === "player1") alert(`${gameInfo.players[0].name} you win!`)
            if(gameInfo.turn === "player2") alert(`${gameInfo.players[1].name} you win!`)
            gameInfo.reset();
        }  
        else if(gameInfo.counter === 9) {
            alert("it's a tie!")
            gameInfo.reset();
        }

         
    },
    reset: function() {
        gameBoard.gameboard.forEach(function(square) {
            square.innerHTML = ''
        });
        gameInfo.turn = ''
        gameInfo.players = []
        gameInfo.counter = 0
        mainContainer.removeChild(playersTurn);
        mainContainer.appendChild(startGameBtn);
    }
}

/* -------Creates board --------*/
// method which automatically  
//includes access to  array of all the divs on the board
const gameBoard = (() => {
    const gameboard = [];
    let square = document.createElement('div');
    square.classList.add('square');
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