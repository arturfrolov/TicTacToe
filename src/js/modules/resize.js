function resize(parentSelector, targetSelector, addremoveSelector) {
  const parent = document.querySelector(parentSelector);
  const container = parent.querySelector(targetSelector);
  let viewportWidth = document.documentElement.clientWidth;

  function checkWidth() {
    if (
      viewportWidth < 992 &&
      !container.classList.contains(addremoveSelector)
    ) {
      container.classList.add(addremoveSelector);
    } else if (
      viewportWidth >= 992 &&
      container.classList.contains(addremoveSelector)
    ) {
      container.classList.remove(addremoveSelector);
    }
  }

  window.addEventListener('resize', () => {
    viewportWidth = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
    checkWidth();
  });

  checkWidth();
}

export default resize;
