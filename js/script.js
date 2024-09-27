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