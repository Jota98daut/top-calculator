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
