const display = document.getElementById('result');
const clearButton = document.getElementById('clear');
const backspaceButton = document.getElementById('backspace');
const equalsButton = document.getElementById('buttoneq');
const numberButtons = document.querySelectorAll('#zero, #one, #two, #three, #four, #five, #six, #seven, #eight, #nine');
const operatorButtons = document.querySelectorAll('#add, #subtract, #multiply, #divide');
const decimalButton = document.getElementById('decimal');
const modulusButton = document.getElementById('modulus');
const plusminusButton = document.getElementById('plusminus');

let currentNumber = '';
let previousNumber = '';
let currentOperator = '';

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    currentNumber += button.textContent;
    display.value = currentNumber;
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (currentNumber !== '') {
      previousNumber = currentNumber;
      currentNumber = '';
      currentOperator = button.textContent;
      display.value = currentNumber;
    }
  });
});

equalsButton.addEventListener('click', () => {
  if (currentNumber !== '' && previousNumber !== '') {
    let result;
    switch (currentOperator) {
      case '+':
        result = parseFloat(previousNumber) + parseFloat(currentNumber);
        break;
      case '-':
        result = parseFloat(previousNumber) - parseFloat(currentNumber);
        break;
      case '*':
        result = parseFloat(previousNumber) * parseFloat(currentNumber);
        break;
      case '/':
        if (parseFloat(currentNumber) !== 0) {
          result = parseFloat(previousNumber) / parseFloat(currentNumber);
        } else {
          display.value = 'Error';
          return;
        }
        break;
      default:
        result = 0;
    }
    display.value = result;
    currentNumber = result.toString();
    previousNumber = '';
    currentOperator = '';
  }
});

modulusButton.addEventListener('click', () => {
  if (currentNumber !== '' && previousNumber !== '') {
    let result = parseFloat(previousNumber) % parseFloat(currentNumber);
    display.value = result;
    currentNumber = result.toString();
    previousNumber = '';
    currentOperator = '';
  } else if (currentNumber !== '') {
    currentNumber = (parseFloat(currentNumber) / 100).toString();
    display.value = currentNumber;
  }
});

clearButton.addEventListener('click', () => {
  display.value = '';
  currentNumber = '';
  previousNumber = '';
  currentOperator = '';
});

backspaceButton.addEventListener('click', () => {
  currentNumber = currentNumber.slice(0, -1);
  display.value = currentNumber;
});

decimalButton.addEventListener('click', () => {
  if (currentNumber !== '' && !currentNumber.includes('.')) {
    currentNumber += '.';
    display.value = currentNumber;
  } else if (currentNumber === '') {
    currentNumber = '0.';
    display.value = currentNumber;
  }
});

plusminusButton.addEventListener('click', () => {
  if (currentNumber !== '' && currentNumber !== '.') {
    currentNumber = (parseFloat(currentNumber) * -1).toString();
    display.value = currentNumber;
  }
});
