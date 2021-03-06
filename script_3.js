const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys');
//Display
const lowerDisplay = document.querySelector('[data-current-operand]'); 
const upperDisplay = document.querySelector('[data-previous-operand]');

// For calculating numbers 
let secondValue = '';
let operator = '';
let firstValue ='';
let result = '';

let box = [];
let box2 = [];

keys.addEventListener('click', event => {
    
    const key = event.target;
    const keyValue = event.target.innerText;
    const lowerDisplayValue = lowerDisplay.innerText;
    const upperDisplayValue = upperDisplay.innerText;
    const type = key.dataset.type;
    const previousOperator = calculator.dataset.previousOperator
          console.log(previousOperator)

    if(type === 'decimal'){
        if(lowerDisplayValue === '0'){
            lowerDisplay.innerText += '.';   
        }else if (!lowerDisplayValue.includes('.')){ 
            lowerDisplay.innerText += '.'; 
        }
    }
    if(type === 'number') {


        if(lowerDisplayValue === '0'){
            lowerDisplay.innerText = keyValue;  //1
        }else if(firstValue && previousOperator){   //1+
            console.log("key"+keyValue)
            lowerDisplay.innerText = keyValue;
            console.log(lowerDisplay.innerText)
            secondValue = parseFloat(keyValue)
            console.log("sec"+ secondValue)
            console.log("preOp "+previousOperator)
        }else if( firstValue, previousOperator, secondValue){
            console.log(firstValue, previousOperator, secondValue)
            calculate();
            lowerDisplay.innerText = result;
            firstValue = result;
        }else{
            lowerDisplay.innerText += keyValue;      //1 => 11 
        } 
        box.push(keyValue);
          console.log(box)
    }

    if(type === 'operation'){
        operator = keyValue;  // +
        box.push(operator);
        firstValue = parseFloat(lowerDisplayValue); //1
        console.log("1st: "+firstValue)
        console.log(operator)
        
        if(firstValue, previousOperator, secondValue ){
            console.log(firstValue, previousOperator, secondValue)
            calculate(firstValue, previousOperator, secondValue);
            upperDisplay.innerText = result + operator;
            lowerDisplay.innerText = result;
        }else{
            upperDisplay.innerText = firstValue + operator; // 1+
            lowerDisplay.innerText = firstValue;            //1
        }
        
        calculator.dataset.previousOperator = operator;
        console.log(calculator.dataset.previousOperator)
    }

    if(type === 'equal'){
        if(lowerDisplayValue === '0'){
            return;
        }
        //secondValue = parseFloat(lowerDisplayValue);
          //console.log(secondValue);
        calculate(firstValue, secondValue, previousOperator); 
        updateDisplay();
       
    }

    if(type === 'all-clear'){
        lowerDisplay.innerText = '0';
        upperDisplay.innerText = '';
        firstValue = '';
        secondValue = '';
        operator = '';
        box = [];
          console.log("L"+lowerDisplayValue, "U"+upperDisplayValue, "F"+firstValue, "S"+secondValue, "O"+operator, "B" +box)
    }

    if(type === 'negate'){
        firstValue = - parseFloat(lowerDisplayValue);
        lowerDisplay.innerText = firstValue;
         //console.log(firstValue);
    }

    if(type === 'percent'){
        firstValue = lowerDisplayValue;
        console.log(firstValue);
        firstValue *= 0.01;
        lowerDisplay.innerText = firstValue;
    }

    if(type === 'delete'){
        box.pop();
        console.log(box)

        if(lowerDisplayValue === '0'){            
            if(upperDisplayValue){
              upperDisplay.innerText = box.join('');
            }
        }else if(lowerDisplayValue){
            if(upperDisplayValue && result){
                 lowerDisplay.innerText = '';
                 console.log(result);
            }
          lowerDisplay.innerText = box.join('');
        }
    }
})

function calculate(firstValue, previousOperator, secondValue ){
       console.log(firstValue, secondValue, operator)
    if(previousOperator === '+') result = firstValue + secondValue;
    if(previousOperator === '-') result = firstValue - secondValue;
    if(previousOperator === '??') result = firstValue / secondValue;
    if(previousOperator === '??') result = firstValue * secondValue;
       console.log("Re:"+result); 
    return result;     
}

function updateDisplay() {
    lowerDisplay.innerText = result;
    console.log(lowerDisplay.innerText)
    upperDisplay.innerText = firstValue + operator + secondValue + "="; 
}

function defaultDisplay () {
    lowerDisplay.innerText = '0';
}