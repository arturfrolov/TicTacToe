import 'bootstrap';
import '../sass/style.scss';
// import '../icons/sprite.svg';
// eslint-disable-next-line import/no-unresolved
import 'virtual:svg-icons-register';



// eslint-disable-next-line func-names
window.onload = function() {
    const chooseBtn = document.querySelector('.js--choose_btn');
    if (chooseBtn) {
        chooseBtn.click();
    }
}


const playerBtn = document.querySelector('.js--player');
const computerBtn = document.querySelector('.js--computer');



function initTic(computer) {
    const gameField = document.querySelector('.tictactoe__grid');
    const currentPlayer = document.querySelector('#currentPlayer');
    const statusPlayerX = document.querySelector('.tictactoe__x');
    const statusPlayer0 = document.querySelector('.tictactoe__0');
    const gameFieldElements = gameField.getElementsByTagName('div');
    const winBtn = document.querySelector('.js--win_btn');
    const winnerLabel = document.querySelector('#winnerLabel');
    let counter = 1;

    const winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // горизонтали
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // вертикали
        [0, 4, 8], [2, 4, 6] // диагонали
    ];



    function comPlay() {
        console.log(computer);
        console.log(counter);
        const noClickedCell = [...gameFieldElements].filter(item => !item.classList.contains('clicked_once'));
        const randomElement = noClickedCell[Math.floor(Math.random() * noClickedCell.length)];
        randomElement.click();
    }


    function winnerDisplay(winner) {
        // eslint-disable-next-line no-unused-expressions
        winner.length > 1
            ? winnerLabel.textContent = 'score tie'
            : winnerLabel.textContent = `${winner} WIN`;
        gameField.innerHTML = `
            <div></div><div></div><div></div>
            <div></div><div></div><div></div>
            <div></div><div></div><div></div>
        `;
        counter = 1;
        winBtn.click();
    }

    function checkWinCombinations(currentPlayerValue) {

        for (const combination of winCombinations) {
            const winPlayer = combination.every( item => gameFieldElements[item].classList.contains(currentPlayerValue));
            if (winPlayer) {
                console.log(currentPlayerValue, 'wins');
                winnerDisplay(currentPlayerValue);
                break;
            } else if (!winPlayer && counter > 9) {
                console.log('score tie');
                winnerDisplay('score tie');
                break;
            }
        }
    }


    function status(player) {
        if (player === 'X') {
            currentPlayer.textContent = '0';
            statusPlayerX.classList.remove('active');
            statusPlayer0.classList.add('active');
        } else {
            currentPlayer.textContent = 'X';
            statusPlayer0.classList.remove('active');
            statusPlayerX.classList.add('active');

        }
    }
    function addClickCell({
        event,
        iconId,
        clicked,
        statusValue,
    }) {
        console.dir(event.target);

        const currentCell = event.target;
        if (!currentCell.classList.contains(clicked) && currentCell.tagName === 'DIV' && !currentCell.classList.contains('tictactoe__grid')) {
            currentCell.classList.add(clicked, statusValue)
            currentCell.innerHTML = `
              <svg class="${iconId}">
                <use xlink:href="#${iconId}"></use>
              </svg>
            `;
            status(statusValue);
            counter++;

        }
        console.dir(counter);
    }

    gameField.addEventListener('click', (event) => {
        if (counter % 2 === 0) {
            addClickCell({
                event,
                iconId: 'icon-zero',
                clicked: 'clicked_once',
                statusValue: '0',
            });
            checkWinCombinations('0');
        } else {
            addClickCell({
                event,
                iconId: 'icon-cross_1',
                clicked: 'clicked_once',
                statusValue: 'X',
            });
            if (computer) {
                comPlay();
            }
            checkWinCombinations('X');

        }
    })
}

playerBtn.addEventListener('click', () => {
    initTic();
});

computerBtn.addEventListener('click', () => {
    initTic(computerBtn);
});
