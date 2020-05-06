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

// Spans comments

let spanComments = {
    empty: "The input value is empty",
    correct: "Correct",
    wrong: {
        name: "The name has wrong format",
        surname: "The surname has wrong format",
        email: "The email has wrong format",
        image: "The image has wrong extension",
    }
}

// regex tests on every input

formInputs.forEach(input => {

    if (input.value === "" || input.value === null) {
        input.setAttribute("data-inputBool", "false");
    }

    input.addEventListener("input", event => {


        let correctSpan = [...spanValidation];
        let wrongSpan = [...spanValidation];
        let emptySpan = [...spanValidation];
        inputsValidity[event.target.dataset["input"]] = formRegexes[event.target.dataset["input"]].test(event.target.value);

        // check empty values and adding spans dataset
        if (event.target.value === "" || event.target.value === null) {
            event.target.setAttribute("data-inputBool", "empty");
            emptySpan = emptySpan.find((item) => {
                return item.dataset[event.target.dataset["input"]]
            });
            emptySpan.setAttribute("data-inputBool", "empty");
        }  

        // check true values from regex and adding spans dataset
        else if (inputsValidity[event.target.dataset["input"]] === true) {
            event.target.setAttribute("data-inputBool", true);
            correctSpan = correctSpan.find((item) => {
                return item.dataset[event.target.dataset["input"]]
            });
            correctSpan.setAttribute("data-inputBool", true);

        }

        // check false values from regex and adding spans dataset

        else if (inputsValidity[event.target.dataset["input"]] === false) {
            event.target.setAttribute("data-inputBool", false);
            wrongSpan = wrongSpan.find((item) => {
                return item.dataset[event.target.dataset["input"]]
            });
            wrongSpan.setAttribute("data-inputBool", false);
            // wrongSpan.innerHTML = spanComments['wrong'][event.target.dataset["input"]];
        } 
    })
})

// form validation 

mainForm.addEventListener("submit", (event) => {

    // check if all inputs return true from regex    
    if (
        Object.values(inputsValidity)
            .every(item => item === true)
    ) {
        alert('Form is sent!')

        return true;
    } else {

        // logic if not all inputs return true from regex        
        event.preventDefault();
        console.log("Form not submitted");

        formInputs.forEach(input => {

            // dealing with inputs which returned false with spans  
            if (input.getAttribute('data-inputBool') === "false") {
                input.classList = "inputError";
                for (wrongSpan of spanValidation) {
                    if (wrongSpan.getAttribute('data-inputBool') === "false") {
                        wrongSpan.classList = "spanError";
                        wrongSpan.innerText = spanComments['wrong'][wrongSpan.dataset["comment"]] ;
                    } else if (wrongSpan.getAttribute('data-inputBool') === null) {
                        wrongSpan.classList = "spanError";
                        wrongSpan.innerText = "Input value is missing"  
                    }
                }
                // dealing with inputs which returned true with spans   

            } else if (input.getAttribute('data-inputBool') === "empty") {
                input.classList = "inputError";
                for (emptySpan of spanValidation) {
                    if (emptySpan.getAttribute('data-inputBool') === "empty") {
                        emptySpan.classList = "spanError";
                        emptySpan.innerText = "Input value is missing" 
                    }
                }
            } else if (input.getAttribute('data-inputBool') === "true") {
                input.classList = "inputCorrect";
                for (correctSpan of spanValidation) {
                    if (correctSpan.getAttribute('data-inputBool') === "true") {
                        correctSpan.classList = "spanCorrect";
                        correctSpan.innerText = "Correct Value" 
                    }
                }

            }
        })
    }
    return false;

})