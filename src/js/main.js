import 'bootstrap';

import '../sass/style.scss';
// import '../icons/sprite.svg';
import 'virtual:svg-icons-register';
// import resize from './modules/resize';
// import hamburgerMenu from './modules/hamburger-menu';
// import fixedmenu from './modules/fixedmenu';
// import search from './modules/search';
// import forms from './modules/form';


const gameField = document.querySelector('.tictactoe__grid');

gameField.addEventListener('click', (event) => {
    console.dir(event.target);
    event.target.innerHTML = `
         <svg class="cross">
            <use xlink:href="#icon-cross_1"></use>
         </svg>
    `;
})