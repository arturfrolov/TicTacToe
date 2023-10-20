function fixedmenu() {
  const menu = document.querySelector('.menu');
  const header = document.querySelector('.header');
  let viewportWidth = document.documentElement.clientWidth;

  function checkWidth() {
    if (viewportWidth < 992) {
      header.setAttribute(
        'style',
        'position: fixed; top: 0; width: 100%; z-index: 100;'
      );
      menu.removeAttribute('style');
    } else {
      header.removeAttribute('style');
    }
  }

  function checkHeight() {
    if (viewportWidth >= 992 && window.scrollY >= 101) {
      menu.setAttribute(
        'style',
        'position: fixed; top: -1px; width: 100%; background-color: #0833C5; z-index: 100;'
      );
      header.removeAttribute('style');
    } else {
      menu.removeAttribute('style');
    }
  }

  window.addEventListener('resize', () => {
    viewportWidth = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
    checkWidth();
    checkHeight();
  });

  window.addEventListener('scroll', checkHeight);

  checkWidth();
  checkHeight();
}

export default fixedmenu;
