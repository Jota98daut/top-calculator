const display = document.querySelector("#display");
const numberButtons = document.querySelectorAll(".number-button");
const operationButtons = document.querySelectorAll(".operation-button");
const clearButton = document.querySelector("#clear");
const equalsButton = document.querySelector("#equals");
let currentNumber = "";
let numbers = [];
let operations = [];
let showingError = false;

for(const button of numberButtons) {
  button.addEventListener('click', handleClickOnNumber);
}

for(const button of operationButtons) {
  button.addEventListener('click', handleClickOnOperation);
}

window.addEventListener('keydown', handleKeyDown);

clearButton.addEventListener('click', reset);

equalsButton.addEventListener('click', handleClickOnEquals);

function handleClickOnNumber(event) {
  readNumber(event.target.value);
}

function readNumber(number) {
  if(showingError) {
    reset();
    showingError = false;
  }
  currentNumber += number;
  updateDisplay(display.textContent + number);
}

function handleClickOnOperation(event) {
  readOperation(event.target.value);
}

function readOperation(op) {
  updateDisplay(display.textContent + ` ${op} `);

  switch(op) {
    case "+":
      operations.push(add);
      break;
    case "-":
      operations.push(subtract);
      break;
    case "*":
      operations.push(multiply);
      break;
    case "/":
      operations.push(divide);
      break;
    default: break;
  }

  addCurrentNumber();
}

function handleClickOnEquals() {
  addCurrentNumber();
  if(numbers.length - operations.length != 1) return null;

  while(numbers.length > 1) {
    try {
      solveFor(multiply);
      solveFor(divide);
      solveFor(add);
      solveFor(subtract);
    } catch(err) {
      reset();
      showError(`Error: ${err}`);
    }
  }

  if(numbers.length == 1) {
    updateDisplay(numbers[0]);
    currentNumber = `${numbers[0]}`;
    numbers = [];
  }

}

function handleKeyDown(event) {
  if(/^\d|\.$/.test(event.key)) { // If the key pressed is a number
    readNumber(event.key);
  } else if(/^(\+|\-|\*|\/)$/.test(event.key)) {
    readOperation(event.key);
  } else if(event.key == "=" || event.key == "Enter") {
    handleClickOnEquals();
  } else if(event.key == "Delete") {
    reset();
  }
}

function addCurrentNumber() {
  if(currentNumber == "") showError("Invalid input: an operator needs two numbers");
  else if(!isValid(currentNumber)) showError("Invalid input: invalid numbers");
  else {
    const number = parseFloat(currentNumber);
    currentNumber = "";
    numbers.push(number);
  }
}

function updateDisplay(content) {
  display.textContent = content;
}

function showError(error) {
  reset();
  updateDisplay(error);
  showingError = true;
}

function reset() {
  currentNumber = "";
  numbers = [];
  operations = [];
  updateDisplay("");
}

function isValid(number) {
  let nDots = number.split("").reduce(
    (acc, c) => { return (c == ".") ? acc + 1 : acc; }, 0);

  if(nDots > 1) return false;

  return true;
}

function solveFor(operation) {
  let a, b, result;
  let index = operations.findIndex(op => op == operation);
  while(index != -1) {
    a = numbers[index];
    b = numbers[index+1];
    try { result = operation(a, b); }
    catch(err) { throw err; }
    numbers[index] = result;
    numbers.splice(index+1, 1);
    operations.splice(index, 1);
    index = operations.findIndex(op => op == operation);
  }
}

const add = (a, b) => a+b;

const subtract = (a, b) => a-b;

const multiply = (a, b) => a*b;

const divide = (a, b) => {
  if(b == 0) throw "division by 0";
  return a / b;
}

function operate(op, a, b) {
  try { return op(a, b); } 
  catch(e) { console.error(e); }
}
