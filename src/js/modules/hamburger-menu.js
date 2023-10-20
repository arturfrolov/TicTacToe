function hamburgerMenu({
  hamburgerSelector,
  menuSelector,
  closeElemSelector,
  overlaySelector,
}) {
  const hamburger = document.querySelector(hamburgerSelector);
  const menu = document.querySelector(menuSelector);
  const close = document.querySelector(closeElemSelector);
  const overlay = document.querySelector(overlaySelector);

  hamburger.addEventListener('click', () => {
    const body = document.querySelector('body');
    body.setAttribute('style', 'height: 100vh; overflow: hidden');
    menu.classList.add('active');
  });

  menu.addEventListener('click', (event) => {
    if (event.target === close || event.target === overlay) {
      const body = document.querySelector('body');
      body.removeAttribute('style');
      menu.classList.remove('active');
    }
  });
}

export default hamburgerMenu;
