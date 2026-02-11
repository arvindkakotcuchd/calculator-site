const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentInput = "";
let firstNumber = null;
let operator = null;

buttons.forEach(button =>{
    button.addEventListener("click", ()=>{
        const value = button.dataset.value;

        // Number Buttons
        if(value !== undefined && !button.classList.contains("operator")){
            currentInput += value;
            display.value = currentInput;
        }

        // Operator Buttons
        if(button.classList.contains("operator")){
            
            // If already a number is entered
            if(currentInput !== ""){
                firstNumber = parseInt(currentInput);
                operator = value;
                display.value = firstNumber + operator;
                currentInput = ""
            }

            else if(firstNumber !== null){
                operator = value;
                display.value = firstNumber + operator;
            }
        }

        // Equals

        if (button.classList.contains("equals")) {
            if (currentInput === "" || firstNumber === null) return;

            const secondNumber = parseInt(currentInput);
            let result = 0;

            switch (operator) {
                case "+":
                    result = firstNumber + secondNumber;
                    break;
                case "-":
                    result = firstNumber - secondNumber;
                    break;
                case "*":
                    result = firstNumber * secondNumber;
                    break;
                case "/":
                    if (secondNumber === 0) {
                        display.value = "Error";
                        reset();
                        return;
                    }
                    result = Math.floor(firstNumber / secondNumber); // Integer division
                    break;
            }

            display.value = result;
            currentInput = result.toString();
            firstNumber = null;
            operator = null;
        }

        // Clear Button
        if (button.classList.contains("clear")) {
            reset();
        }
    });
});

function reset(){
    currentInput = "";
    firstNumber = null;
    operator = null;
    display.value = "";
}