# interactive_form

## Real-Time Form Validation
- **Email Input Field Validation**: the name field is validated in real-time as the user inputs their information. 
    - Validation occurs on keyup event.
    - User receivess immediate visual feedback. 
    - the email must follow the structure of an email address with letters, the @ symbol and a web address with letters a period followed by letters. 
    - Once validation is verified, the error message and visual feedback is removed and a green checkmark should appear. 

## Conditional Error Message - CVV Input
- **CVV Input Number Validation**:
    - if the field is left empty:
        - Error Message: "CVV number should not be empty!"
    - If the field contains an invalid 3-digit CVV number:
        - Error message: "CVV must be a 3-digit number"

