import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  const { delay, step, amount } = e.target.elements;

  let delayVal = delay.valueAsNumber;
  let stepVal = step.valueAsNumber;
  let amountVal = amount.valueAsNumber;

  for (let i = 0; i < amountVal; i += 1) {
    createPromise(i + 1, delayVal)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delayVal += stepVal;
  }
}

function createPromise(position, delay) {
  const obj = { position, delay };
  return new Promise((res, rej) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.5;
      if (shouldResolve) {
        res(obj);
      } else {
        rej(obj);
      }
    }, delay);
  });
}
