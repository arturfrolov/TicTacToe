import 'bootstrap';
// import '../../index.html';
import '../sass/style.scss';
import '../img/spinner.svg';
// import '../icons/sprite.svg';
// import 'virtual:svg-icons-register';
import resize from './modules/resize';
import hamburgerMenu from './modules/hamburger-menu';
import fixedmenu from './modules/fixedmenu';
import search from './modules/search';
import forms from './modules/form';

resize('.menu', '.container', 'p-0');
hamburgerMenu({
  hamburgerSelector: '.js-hamburger',
  menuSelector: '.menu',
  closeElemSelector: '.js-menu__close',
  overlaySelector: '.overlay',
});
fixedmenu();
search();
forms('form', '.modal', '.modal-close');
