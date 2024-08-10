let buttonClasses = [".seven button", ".bu button", ".pos button", ".seve button", ".sev button"];
let display = document.querySelector(".hi");
let resultDisplay = document.querySelector("h2");

let firstOperand = "";
let secondOperand = "";
let operator = "";

// Function to append button text to display with a limit of 15 characters
buttonClasses.forEach(buttonClass => {
    let buttons = document.querySelectorAll(buttonClass);
    buttons.forEach(button => {
        button.addEventListener("click", (e) => {
            if (display.innerText.length < 15) {
                display.innerText += e.target.innerText;
            }
        });
    });
});

// Functionality for "AC" button
let acButton = document.querySelector(".ac button:first-child");
acButton.addEventListener("click", () => {
    display.innerText = "";
    resultDisplay.innerText = "";
    firstOperand = "";
    secondOperand = "";
    operator = "";
    audio.play();
});

// Functionality for "C" button
let cButton = document.querySelector(".ac button:last-child");
cButton.addEventListener("click", () => {
    display.innerText = display.innerText.slice(0, -1);
});

// Functionality for "e" button
let eButton = document.querySelector(".but button:first-child");
eButton.addEventListener("click", () => {
    if (display.innerText.length < 15) {
        display.innerText += Math.E.toFixed(3); // Append the value of e (2.718)
        audio.play();
    }
});

// Functionality for "sin" button
let sinButton = document.querySelector(".but button:nth-child(3)");
sinButton.addEventListener("click", () => {
    let value = parseFloat(display.innerText);
    if (!isNaN(value)) {
        display.innerText = Math.sin(value).toFixed(3); // Calculate sine and update display
        audio.play();
    }
});

// Functionality for "µ" button
let microButton = document.querySelector(".but button:nth-child(2)");
microButton.addEventListener("click", () => {
    if (display.innerText.length < 15) {
        display.innerText += "µ"; // Append the micro symbol
        audio.play();
    }

});

// Functionality for "deg" button
let degButton = document.querySelector(".but button:last-child");
degButton.addEventListener("click", () => {
    let value = parseFloat(display.innerText);
    if (!isNaN(value)) {
        display.innerText = (value * (180 / Math.PI)).toFixed(3); // Convert radians to degrees
        audio.play();
    }
});

// Functionality for operators
let operatorButtons = document.querySelectorAll(".bu button, .pos button");
operatorButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        if (display.innerText !== "" && operator === "") {
            firstOperand = display.innerText;
            operator = e.target.innerText;
            display.innerText = ""; // Clear the display for the second operand
        }
        audio.play();
    });
});

// Functionality for "=" button
let equalButton = document.querySelector(".equal button");
equalButton.addEventListener("click", () => {
    if (firstOperand !== "" && operator !== "" && display.innerText !== "") {
        secondOperand = display.innerText;
        let result;
        switch (operator) {
            case "+":
                result = parseFloat(firstOperand) + parseFloat(secondOperand);
                break;
            case "-":
                result = parseFloat(firstOperand) - parseFloat(secondOperand);
                break;
            case "*":
                result = parseFloat(firstOperand) * parseFloat(secondOperand);
                break;
            case "/":
                if (parseFloat(secondOperand) === 0) {
                    resultDisplay.innerText = "Error:";
                    return;
                }
                result = parseFloat(firstOperand) / parseFloat(secondOperand);
                break;
            default:
                resultDisplay.innerText = "Error:";
                return;
        }
        resultDisplay.innerText = `= ${result.toFixed(2)}`; // Display the result in the h2 tag
        display.innerText.h2 = ""; // Clear the display
        firstOperand = "";
        secondOperand = "";
        operator = "";
    } else {
        resultDisplay.innerText = "Input Error";
    }
    audio.play();
});
const audio = new Audio("../Audios/Click - Sound Effect (HD).mp3");
