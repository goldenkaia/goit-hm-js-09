import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputEl = document.querySelector('#datetime-picker');
const btnEl = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
let timerId = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDates]) {
    const toggle = selectedDates < Date.now();
    clearInterval(timerId);
    toggleBTN(toggle);
    if (toggle) {
      alert('Please choose a date in the future');
    }
  },
};

flatpickr(inputEl, options);

toggleBTN();
function toggleBTN(bool = true) {
  btnEl.disabled = bool;
}

btnEl.addEventListener('click', onClick);

function onClick() {
  toggleBTN();
  const userTime = new Date(inputEl.value).getTime();
  timerId = setInterval(() => {
    const deltaTime = userTime - Date.now();
    if (deltaTime < 500) {
      clearInterval(timerId);
      return;
    }
    const date = convertMs(deltaTime);
    updateTimer(date);
  }, 1000);
}

function updateTimer({ days, hours, minutes, seconds } = {}) {
  daysEl.textContent = padStart(days);
  hoursEl.textContent = padStart(hours);
  minutesEl.textContent = padStart(minutes);
  secondsEl.textContent = padStart(seconds);
}

function padStart(time) {
  return String(time).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
