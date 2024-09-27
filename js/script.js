//putting focus on the first input field when the DOM is loaded
addEventListener('DOMContentLoaded', () => {
    const userName = document.querySelector('input[type="text"]');
    userName.focus();
});

//showing an input for an unlisted job role when the 'other' is chosen
const jobSelect = document.querySelector('#title');
const otherJobInput = document.querySelector('#other-job-role');

otherJobInput.style.display = 'none';
console.log(jobOptions.value);

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