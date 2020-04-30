// Selected elements

let mainForm = document.querySelector("form#mainForm");
let formInputs = [...document.querySelectorAll("input[data-input]")];
let formName = document.querySelector("input#formName");
let formSurname = document.querySelector("input#formSurname");
let formEmail = document.querySelector("input#formEmail");
let formImage = document.querySelector("input#formImage");
let formMessage = document.querySelector("input#formMessage");
let spanValidation = [...document.querySelectorAll("span[data-validate]")];

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

// regex tests on every input

formInputs.forEach(input => {

    if (input.value === "" || input.value === null) {
        input.setAttribute("data-inputBool", false);
    }

    input.addEventListener("input", event => {
        let correctSpan = [...spanValidation];
        let wrongSpan = [...spanValidation];
        inputsValidity[event.target.dataset["input"]] = formRegexes[event.target.dataset["input"]].test(event.target.value);

        if (inputsValidity[event.target.dataset["input"]] === true) {
            event.target.setAttribute("data-inputBool", true);
            correctSpan = correctSpan.find((item) => {
                return item.dataset[event.target.dataset["input"]]
            });
            correctSpan.setAttribute("data-inputBool", true);
            console.log(correctSpan)

        } 
        else if (inputsValidity[event.target.dataset["input"]] === false) {
            event.target.setAttribute("data-inputBool", false);
            wrongSpan = wrongSpan.find((item) => {
                return item.dataset[event.target.dataset["input"]]
            });
            wrongSpan.setAttribute("data-inputBool", false);
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
            if (input.getAttribute('data-inputBool') === "false") {
                input.classList = "inputError";
                spanValidation.forEach(item => item.classList = "spanError");
            } else if (input.getAttribute('data-inputBool') === "true") {
                input.classList = "inputCorrect";

                spanValidation.forEach(item => item.classList = "spanCorrect");
            }
        })
    }
    return false;

})