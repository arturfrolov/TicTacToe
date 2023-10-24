// import 'bootstrap';
import '../sass/style.scss';
// import '../icons/sprite.svg';
// eslint-disable-next-line import/no-unresolved
import 'virtual:svg-icons-register';





function initTic() {
    const gameField = document.querySelector('.tictactoe__grid');
    const currentPlayer = document.querySelector('#currentPlayer');
    const statusPlayerX = document.querySelector('.tictactoe__x');
    const statusPlayer0 = document.querySelector('.tictactoe__0');
    const gameFieldElements = gameField.querySelectorAll('div');
    console.log(gameFieldElements)
    let counter = 1;

    const winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // горизонтали
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // вертикали
        [0, 4, 8], [2, 4, 6] // диагонали
    ];

    function checkWinCombinations() {

        for (const combination of winCombinations) {
            const winX = combination.every( item => gameFieldElements[item].classList.contains('X'));
            const win0 = combination.every( item => gameFieldElements[item].classList.contains('0'));
            if (winX) {
                console.log('X wins');
                break;
            } else if (win0) {
                console.log('0 wins');
                break;
            } else if (!winX && !win0 && counter > 9) {
                console.log('score tie');
                break;
            }
        }
    }


    function status(player) {
        if (player === 'X') {
            currentPlayer.textContent = '0';
            statusPlayer0.classList.remove('active');
            statusPlayerX.classList.add('active');
        } else {
            currentPlayer.textContent = 'X';
            statusPlayerX.classList.remove('active');
            statusPlayer0.classList.add('active');
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
        if (!currentCell.classList.contains(clicked) && currentCell.tagName === 'DIV') {
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
            checkWinCombinations();
        } else {
            addClickCell({
                event,
                iconId: 'icon-cross_1',
                clicked: 'clicked_once',
                statusValue: 'X',
            });
            checkWinCombinations();
        }
    })
}

initTic();