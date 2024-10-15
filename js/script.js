//putting focus on the first input field when the DOM is loaded
addEventListener('DOMContentLoaded', () => {
    const userName = document.querySelector('input[type="text"]');
    userName.focus();
});

//showing an input for an unlisted job role when the 'other' is chosen
const jobSelect = document.querySelector('#title');
const otherJobInput = document.querySelector('#other-job-role');

otherJobInput.style.display = 'none';
console.log(jobSelect.value);

jobSelect.addEventListener('change', () => {
    console.log(jobSelect.value)

    if (jobSelect.value === 'other') {
        otherJobInput.disabled = false;
        otherJobInput.style.display = 'block';
    } else {
        otherJobInput.style.display = 'none';
        otherJobInput.disabled = true;
        otherJobInput.value = '';
    }    
})

//T-shirt info section
//change the color selection depending on the design chosen
const designSelect = document.querySelector("#design");
const colorSelect = document.querySelector("#color");
const colorOptions = document.querySelectorAll("option[data-theme]");
//console.log(designSelect.value)

colorSelect.disabled = true;

designSelect.addEventListener("change", () => {
    
    for(let i = 0; i < colorOptions.length; i++) {
        
        if (designSelect.value !== colorOptions[i].getAttribute("data-theme")) {
            colorOptions[i].hidden = true;
            colorSelect.disabled = false;
        } else {
            colorOptions[i].hidden = false;
            colorSelect.disabled = false;
        }
    }
});

//getting the item cost for each activity, converting to number, and adding it together for a total cost
//intserting the total into the total item cost html

const activityList = document.querySelector('#activities')
const activityItems = document.querySelectorAll('#activities-box label input')

let totalItemCost = 0;

const totalCostElement = document.querySelector('#activities-cost');

activityItems.forEach((checkbox) => 
    checkbox.addEventListener('change', () => {
        const itemCostString = checkbox.getAttribute('data-cost');
        const itemCost = +itemCostString;

        if(checkbox.checked) {
            totalItemCost += itemCost;
            console.log(totalItemCost);
        } else {
            totalItemCost -= itemCost;
            console.log(totalItemCost);
        }

        totalCostElement.innerHTML = `Total: $${totalItemCost}`;
    })
);

//adding payment choice display changes
//when a payment selection is made, the corresponding payment message is displayed

const paymentChoice = document.getElementById('payment');
const creditCardChoice = document.getElementById('credit-card');
const paypalChoice = document.getElementById('paypal');
const bitcoinChoice = document.getElementById('bitcoin');

paypalChoice.style.display = 'none';
bitcoinChoice.style.display = 'none';

paymentChoice.children[1].setAttribute('selected', true);

paymentChoice.addEventListener('change', () => {
    creditCardChoice.style.display = 'none';
    paypalChoice.style.display = 'none';
    bitcoinChoice.style.display = 'none';

    if (paymentChoice.value === 'credit-card') {
        creditCardChoice.style.display = 'block';
    } else if (paymentChoice.value === 'paypal') {
        paypalChoice.style.display = 'block';
    } else if (paymentChoice.value === 'bitcoin') {
        bitcoinChoice.style.display = 'block';
    }
});

//creating form variables
//adding listeners to check the form variables for valid submissions
const form = document.querySelector('form');
const nameInput = document.querySelector('input[id=name]');
const emailInput = document.querySelector('input[id=email]');
const activitiesBox = document.querySelector('#activities-box');
const cardNum = document.querySelector('#cc-num');
const zipCode = document.querySelector('#zip');
const cvvInput = document.querySelector('#cvv');


form.addEventListener('submit', (e) => {
    //temporary prevent default
    e.preventDefault();
    console.log('form submission');

    const nameValue = nameInput.value.trim();
    const nameIsValid = /^[a-z ,.'-]+$/i.test(nameValue);

    console.log('Is Name Valid?', nameIsValid);

    if(!nameIsValid) {
        e.preventDefault();
    } else {
        e.target.submit();
    }



})