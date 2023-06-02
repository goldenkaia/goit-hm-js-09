const bodyEl = document.body;
const btnStartEl = document.querySelector('[data-start]');
const btnStopEl = document.querySelector('[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

let timerId = null;

btnStartEl.addEventListener('click', () => {
  updateStateBtn(true);
  timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

btnStopEl.addEventListener('click', () => {
  updateStateBtn(false);
  clearInterval(timerId);
});

function updateStateBtn(bool) {
  btnStartEl.disabled = bool;
  btnStopEl.disabled = !bool;
}
