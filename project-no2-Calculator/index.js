let calculation = '';

const valueButtons = document.querySelectorAll('[data-value]');
const display = document.querySelector('.js-display');
const clearBtn = document.querySelector('.js-clear');
const deleteBtn = document.querySelector('.js-delete');
const equalBtn = document.querySelector('.js-equal');

valueButtons.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
        const value = btn.dataset.value;
        calculation += value;

        display.innerHTML = calculation;
    });
});

clearBtn.addEventListener('click', ()=>{
    calculation = '';
            display.innerHTML = '0';
});

deleteBtn.addEventListener('click', () => {
    calculation = calculation.slice(0, -1);

    if(calculation === ''){
        display.innerHTML = '0'
    }else{
        display.innerHTML = calculation;
    }
    
});

equalBtn.addEventListener('click', () => {
    calculation = eval(calculation);
    display.innerHTML = calculation;
});



