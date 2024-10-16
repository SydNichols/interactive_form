//putting focus on the first input field when the DOM is loaded
addEventListener('DOMContentLoaded', () => {
    const userName = document.querySelector('input[type="text"]');
    userName.focus();
});

//showing an input for an unlisted job role when the 'other' is chosen
const jobSelect = document.querySelector('#title');
const otherJobInput = document.querySelector('#other-job-role');

otherJobInput.style.display = 'none';

jobSelect.addEventListener('change', () => {
    //console.log(jobSelect.value)

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

//establishing activity-related variables
const activityList = document.querySelector('#activities')
const activityItems = document.querySelectorAll('#activities-box label input')

//function to check activity list for conflicting times
function activityConflicts(activity) {
    const daySelected = activity.getAttribute("data-day-and-time");

    activityItems.forEach((item) => {
        if(item !== activity) {
            const itemsDay = item.getAttribute("data-day-and-time");
            const itemLabel = item.parentElement;

            if  (itemsDay === daySelected) {
                if (activity.checked) {
                    item.disabled = true;
                    itemLabel.classList.add('disabled');
                } else {
                    item.disabled = false;
                    itemLabel.classList.remove('disabled');
                }
            }
        }
    })

};

//getting the item cost for each activity, converting to number, and adding it together for a total cost
//inserting the total into the total item cost html
let totalItemCost = 0;

const totalCostElement = document.querySelector('#activities-cost');

activityItems.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
        const itemCostString = checkbox.getAttribute('data-cost');
        const itemCost = +itemCostString;

        if(checkbox.checked) {
            totalItemCost += itemCost;
        } else {
            totalItemCost -= itemCost;
        }

        activityConflicts(checkbox);

        totalCostElement.innerHTML = `Total: $${totalItemCost}`;
    });

    checkbox.addEventListener('focus', (e) => {
        e.target.parentElement.classList.add('focus');
    });

    checkbox.addEventListener('blur', (e) => {
        e.target.parentElement.classList.remove('focus');
    })

});

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
const form = document.querySelector('form');
const nameInput = document.querySelector('input[id=name]');
const emailInput = document.querySelector('input[id=email]');
const activitiesBox = document.querySelector('#activities-box');
const cardNumInput = document.querySelector('#cc-num');
const zipCodeInput = document.querySelector('#zip');
const cvvInput = document.querySelector('#cvv');

//adding functions to check the form variables for valid submissions
function isValidName(name) {
    const nameValue = name.value.trim();
    const nameRegex = /^[a-z ,.'-]+$/i;
    return nameRegex.test(nameValue);
}

function isEmailValid(email) {
    const emailValue = email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^s@]+$/;
    return emailRegex.test(emailValue)
}

function isActivitySelected() {
    let selected = false;
    activityItems.forEach((checkbox) => {
        if (checkbox.checked) {
            selected = true;
        }
    });
    return selected;
}

//credit card specific validators
function isCreditCardSelected() {
    return paymentChoice.value === 'credit-card';
}

function isValidCardNumber(number) {
    const cardRegex = /^\d{13,16}$/; 
    const cardNumber = number.value.trim();
    return cardRegex.test(cardNumber)
}

function isValidZipCode(zip) {
    const zipRegex = /^\d{5}$/;
    const zipCode = zip.value.trim();
    return zipRegex.test(zipCode)
}

function isValidCVV(cvv) {
    const cvvRegex = /^\d{3}$/;
    const cvvNumber = cvv.value.trim();
    return cvvRegex.test(cvvNumber)
}

//functions to show or hide error messaging and focus elements
function showNotValid(input) {
    input.parentElement.classList.add('not-valid');
    input.parentElement.classList.remove('valid');
    input.parentElement.lastElementChild.style.display = 'block';
}

function showValid(input) {
    input.parentElement.classList.add('valid');
    input.parentElement.classList.remove('not-valid');
    input.parentElement.lastElementChild.style.display = 'none';
}

//real-time validation for the email input
emailInput.addEventListener('keyup', () => {
    const realTimeEmail = isEmailValid(emailInput);

    if (!realTimeEmail) {
        showNotValid(emailInput);
    } else {
        showValid(emailInput);
    }
})

//validation based on form submission attempt
//if select form elements are not valid, the form should not submit
form.addEventListener('submit', (e) => {
    //temporary prevent default
    //e.preventDefault();

    const nameIsValid = isValidName(nameInput);
    //console.log(nameIsValid);

    const emailIsValid = isEmailValid(emailInput);
    //console.log(emailIsValid);

    const activitySelected = isActivitySelected();
    //console.log(activitySelected);

    const creditCardSelected = isCreditCardSelected();
    //console.log(creditCardSelected);

    const validCardNumber = isValidCardNumber(cardNumInput);

    const validZip = isValidZipCode(zipCodeInput);
    
    const validCVV = isValidCVV(cvvInput);

    //if any input fields are invalid, the if statment should catch it and determing which error messaging should be shared.
    if(!nameIsValid || !emailIsValid || !activitySelected || (creditCardSelected && !validCardNumber) || (creditCardSelected && !validZip) || (creditCardSelected && !validCVV)) {
        e.preventDefault();
        if(!nameIsValid) {
            showNotValid(nameInput);
        } else {
            showValid(nameInput);
        };

        if(!emailIsValid) {
            showNotValid(emailInput);
        } else {
            showValid(emailInput);
        };

        if(!activitySelected) {
            showNotValid(activitiesBox);
        } else {
            showValid(activitiesBox);
        };

        if(creditCardSelected && !validCardNumber) {
            showNotValid(cardNumInput);
        } else {
            showValid(cardNumInput);
        };

        if(creditCardSelected && !validZip) {
            showNotValid(zipCodeInput);
        } else {
            showValid(zipCodeInput);
        };
        //conditional error messaging
        if(cvvInput.value.length === 0) {
            cvvInput.parentElement.classList.add('not-valid');
            cvvInput.parentElement.classList.remove('valid');
            cvvInput.parentElement.lastElementChild.textContent = 'CVV number should not be empty!';
            cvvInput.parentElement.lastElementChild.style.display = 'block';
        } else {
            if(creditCardSelected && !validCVV) {
                cvvInput.parentElement.classList.add('not-valid');
                cvvInput.parentElement.classList.remove('valid');
                cvvInput.parentElement.lastElementChild.textContent = 'CVV must be a 3-digit number';
                cvvInput.parentElement.lastElementChild.style.display = 'block';
            } else {
                showValid(cvvInput);
            };
        };
    } else {
        e.target.submit();
    }

})