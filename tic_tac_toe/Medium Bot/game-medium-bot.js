// Medium Bot: The computer blocks the player from winning

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
                window.location.href = 'game-medium-bot.html';
            } else {
                window.location.href = '../index.html';
            }
        }, 69);
        return true; // Indicate that the player has won
    }
    return false; // No win detected
};

const findBlockingMove = () => {
    for (let pattern of winPatterns) {
        let playerCount = 0;
        let emptyIndex = -1;
        for (let index of pattern) {
            if (columns[index].style.backgroundImage === 'url("../x.png")') {
                playerCount++;
            } else if (columns[index].style.backgroundImage === '') {
                emptyIndex = index;
            }
        }
        if (playerCount === 2 && emptyIndex !== -1) {
            return emptyIndex;
        }
    }
    return -1;
};

columns.forEach(column => {
    column.addEventListener('click', () => {
        // Player's turn
        if (column.style.backgroundImage == '') {
            column.style.backgroundImage = 'url("../x.png")';
            if (handleWin('x')) return;
            amountOfMoves--;

            // Check for draw
            setTimeout(() => {
                if (amountOfMoves == 0 && !checkWin('x') && !checkWin('o')) {
                    if (confirm("It's a draw, Do you want to play again?")) {
                        window.location.href = 'game-medium-bot.html';
                    } else {
                        window.location.href = '../index.html';
                    }
                }
            }, 69);

            if (!checkWin('x')) {
                // Computer's turn
                let blockingMove = findBlockingMove();
                if (blockingMove !== -1) {
                    columns[blockingMove].style.backgroundImage = 'url("../o.png")';
                } else {
                    let emptyColumns = Array.from(columns).filter(column => column.style.backgroundImage == '');
                    let randomColumn = emptyColumns[Math.floor(Math.random() * emptyColumns.length)];
                    randomColumn.style.backgroundImage = 'url("../o.png")';
                }
                if (handleWin('o')) return;
                amountOfMoves--;
            }
        }
    });
});
