const display = document.querySelector("#display");
const buttons = document.querySelectorAll("#numpad button");
let displayValue = "";

for(const button of buttons) {
  if(button.id == "clear" || button.id == "equals") continue;

  button.addEventListener('click', handleClick);
}

function handleClick(event) {
  displayValue += event.target.value;
  display.textContent = displayValue;
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
