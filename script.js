// Selected elements

let mainForm = document.querySelector("form#mainForm");
let formInputs = [...document.querySelectorAll("input")];
let formName = document.querySelector("input#formName");
let formSurname = document.querySelector("input#formSurname");
let formEmail = document.querySelector("input#formEmail");
let formImage = document.querySelector("input#formImage");
let formMessage = document.querySelector("input#formMessage");

//Regular expresions

let nameRegex = /[a-z]{2,}/i;
let surnameRegex = /[a-z]{3,}/i;
let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
let imageRegex = /(\.jpg|\.png)$/;

// validation 

mainForm.addEventListener("submit", (event) => {
        if (nameRegex.test(formName.value) && surnameRegex.test(formSurname.value) 
        && emailRegex.test(formEmail.value) && imageRegex.test(formImage.files[0].name)) {
            alert('Form is sent!')
            return true;
        } else {
            event.preventDefault();
            console.log("Form not submitted");
            return false;
            
        }

})

