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

