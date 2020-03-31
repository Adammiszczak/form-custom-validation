// Selected elements

let mainForm = document.querySelector("form#mainForm");
let formName = document.querySelector("input#formName");
let formSurname = document.querySelector("input#formSurname");
let formEmail = document.querySelector("input#formEmail");
let formImage = document.querySelector("input#formImage");
let formMessage = document.querySelector("input#formMessage");


// validation 

mainForm.addEventListener("submit", (event) => {
        event.preventDefault();
        console.log("Form submitted");
})