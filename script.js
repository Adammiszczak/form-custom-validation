// Selected elements

let mainForm = document.querySelector("form#mainForm");
let formInputs = [...document.querySelectorAll("input[data-input]")];
let formName = document.querySelector("input#formName");
let formSurname = document.querySelector("input#formSurname");
let formEmail = document.querySelector("input#formEmail");
let formImage = document.querySelector("input#formImage");
let formMessage = document.querySelector("input#formMessage");
let spanValidation = document.querySelector("span[data-validate]");

//Regular expresions

let nameRegex = /^[a-z]{2,}$/i;
let surnameRegex = /^[a-z]{3,}$/i;
let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
let imageRegex = /(\.jpg|\.png)$/;

let formRegexes = {
    name: nameRegex,
    surname: surnameRegex,
    email: emailRegex,
    image: imageRegex
}

let inputsValidity = {
    name: false,
    surname: false,
    email: false,
    image: false
}

formInputs.forEach(input => {
    input.addEventListener("input", event => {
        inputsValidity[event.target.dataset["input"]] = formRegexes[event.target.dataset["input"]].test(event.target.value);
        if (inputsValidity[event.target.dataset["input"]] == true) {
            event.target.setAttribute("data-inputBool", true);
        } else {
            event.target.setAttribute("data-inputBool", false);
        }
    })
})

// form validation 

mainForm.addEventListener("submit", (event) => {
    if (
        Object.values(inputsValidity)
        .every(item => item === true)
    ) {
        alert('Form is sent!')

        return true;
    } else {
        event.preventDefault();
        console.log("Form not submitted");
        formInputs.forEach(input => {
          if (input.getAttribute('data-inputBool') == "false") {
            input.classList = "inputError";
            spanValidation.classList = "spanError";
          } else if (input.getAttribute('data-inputBool') == "true") {
            input.classList = "inputCorrect";
            spanValidation.classList = "spanCorrect";
          } else {
            input.classList = "inputError";
            spanValidation.classList = "spanError";
          }
        })
    }
    return false;

})