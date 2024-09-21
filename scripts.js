const screen = document.querySelector('.screen');
let currentInput = '';
let operator = '';
let operation = ''; 

const placeholderText = ".0"; 
let isVisible = true;
let isOperationActive = false;
let blinkInterval;



// Blinking Placeholder Logic
function blinkPlaceholder() {
    screen.value = isVisible ? placeholderText : '';
    isVisible = !isVisible;
}

function startBlinking() {
    blinkInterval = setInterval(blinkPlaceholder, 500);
}

function stopBlinking() {
    clearInterval(blinkInterval);
    screen.value = ''; 
}

// Handling number clicks
document.querySelectorAll('.num').forEach(button => {
    button.addEventListener('click', () => {
        stopBlinking(); 
        currentInput += button.textContent;
        operation += button.textContent;
        screen.value = operation;
        isOperationActive = true;
    });
});

// Handling operator clicks
document.querySelectorAll('.operator-button').forEach(button => {
    button.addEventListener('click', () => {
        if (currentInput === '') return; 
        stopBlinking();
        operator = button.textContent;
        operation += ` ${operator} `;
        currentInput = ''; 
        screen.value = operation;
        isOperationActive = true;
    });
});

// Equal button to evaluate
document.querySelector('.equal-button').addEventListener('click', () => {
    if (currentInput === '') return; 

    const result = evaluate(operation);
    screen.value = result;
    currentInput = result;
    operation = ''; 
    isOperationActive = false;
});

// Clear All button
document.querySelector('.clear-all').addEventListener('click', () => {
    currentInput = '';
    operator = '';
    operation = '';
    screen.value = '.0';
    startBlinking(); 
});

// Delete button
document.querySelector('.delete').addEventListener('click', () => {
    currentInput = currentInput.slice(0, -1);
    operation = operation.slice(0, -1);
    screen.value = operation || '.0';
});

// Percent button
document.querySelector('.percent').addEventListener('click', () => {
    if (currentInput === '') return;
    currentInput = (parseFloat(currentInput) / 100).toString();
    operation = currentInput;
    screen.value = currentInput;
});

// Function to evaluate the entire operation string
function evaluate(operation) {
    try {
        
        const sanitizedOperation = operation.replace('×', '*').replace('÷', '/');
        return eval(sanitizedOperation);
    } catch (error) {
        return 'Error';
    } 

}


startBlinking();
