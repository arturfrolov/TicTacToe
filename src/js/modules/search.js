function search() {
  const searchBtnList = document.querySelectorAll('.js-search');
  const wraps = document.querySelectorAll('.header .wrap');
  const inputs = document.querySelectorAll('.header .input');
  const searchHeaderText = document.querySelector('.header__search_text');
  const searchMenuText = document.querySelector('.menu__search_text');

  searchBtnList.forEach((searchBtn) => {
    searchBtn.addEventListener('click', () => {
      wraps.forEach((wrap) => {
        wrap.classList.toggle('active');
      });
      inputs.forEach((input) => {
        input.classList.toggle('active');
        input.closest('form').reset();
        input.focus();
      });
      searchHeaderText.classList.toggle('hide');
      searchMenuText.classList.toggle('hide');
    });
  });
}

export default search;
