// Friend: opponents take turns

const columns = document.querySelectorAll('.col');
xTurn = true;
oTurn = false;

// win patterns
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
];

// checks for 3 in a row
const checkWin = (player) => {
    return winPatterns.some(pattern => {
        return pattern.every(index => {
            return columns[index].style.backgroundImage === `url("../${player}.png")`;
        });
    });
};

// working code with hover effect
columns.forEach(column => {
    column.addEventListener('mouseover', () => {
        if (xTurn == true && column.style.backgroundImage == '') {
            column.style.backgroundImage = 'url("../transparent-x.png")';
        } else if (oTurn == true && column.style.backgroundImage == '') {
            column.style.backgroundImage = 'url("../transparent-o.png")';
        }
    });

    column.addEventListener('mouseout', () => {
        if (column.style.backgroundImage === 'url("../transparent-x.png")' || column.style.backgroundImage === 'url("../transparent-o.png")') {
            column.style.backgroundImage = '';
        }
    });

    column.addEventListener('click', () => {
        if (column.style.backgroundImage === 'url("../transparent-x.png")') {
            column.style.backgroundImage = 'url("../x.png")';
            xTurn = false;
            oTurn = true;
        } else if (column.style.backgroundImage === 'url("../transparent-o.png")') {
            column.style.backgroundImage = 'url("../o.png")';
            xTurn = true;
            oTurn = false;
        }

        setTimeout(function(){
            if (checkWin('x')) {
                if (confirm('X Won, Do you want to play again?')) {
                    window.location.href = 'game-friend.html';
                }else{
                    window.location.href = '../index.html';
                }
            } else if (checkWin('o')) {
                if (confirm('O Won, Do you want to play again?')) {
                    window.location.href = 'game-friend.html';
                }else{
                    window.location.href = '../index.html';
                }
            } else if (Array.from(columns).every(column => column.style.backgroundImage != '')) {
                if (confirm("It's a draw, Do you want to play again?")) {
                    window.location.href = 'game-friend.html';
                }else{
                    window.location.href = '../index.html';
                }
            }
        }, 69);
    });
});