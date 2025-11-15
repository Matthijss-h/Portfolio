// Hard Bot WIP: The computer makes best moves

const columns = document.querySelectorAll('.col');
let amountOfMoves = 9;
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
];

const checkWin = (player) => {
    return winPatterns.some(pattern => {
        return pattern.every(index => {
            return columns[index].style.backgroundImage === `url("../${player}.png")`;
        });
    });
};

const handleWin = (player) => {
    if (checkWin(player)) {
        setTimeout(() => {
            if (confirm(`${player.toUpperCase()} Won, Do you want to play again?`)) {
                window.location.href = 'game-hard-bot.html';
            } else {
                window.location.href = '../index.html';
            }
        }, 69);
        return true; // Indicate that the player has won
    }
    return false; // No win detected
};

columns.forEach(column => {
    column.addEventListener('click', () => {
        // Player's turn
        if (column.style.backgroundImage == '') {
            column.style.backgroundImage = 'url("../x.png")';
            if (handleWin('x')) return;
            amountOfMoves--;
            
            // Check for draw
            setTimeout(() =>{
            if (amountOfMoves == 0 && !checkWin('x') && !checkWin('o')) {
                if (confirm("It's a draw, Do you want to play again?")) {
                    window.location.href = 'game-hard-bot.html';
                } else {
                    window.location.href = '../index.html';
                }
            }
            }, 69);


            // Computer's turn
            let emptyColumns = Array.from(columns).filter(column => column.style.backgroundImage == '');
            let randomColumn = emptyColumns[Math.floor(Math.random() * emptyColumns.length)];
            randomColumn.style.backgroundImage = 'url("../o.png")';
            if (handleWin('o')) return;
            amountOfMoves--;
            }
    });
});