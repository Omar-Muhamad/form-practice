
// ############ local Storage #############

// Refill All form element after input 

function loadStoredData() {
  const userData = JSON.parse(localStorage.getItem('formData'))
  if (userData) {
    const form = document.getElementById("form")
    const formElements = [...form.elements]
    formElements.forEach(element => {
      if (element.tagName !== 'BUTTON'){
        element.value = userData[element.id] || ""
      }
    })
  }
}

loadStoredData();

// storing data to local storage
const storeFormData = () => {
  let formData = JSON.parse(localStorage.getItem('formData')) || {};
  formData = {
    userName : document.getElementById('userName').value,
    email : document.getElementById('email').value,
    textArea : document.getElementById('textarea').value
  };
  localStorage.setItem('formData', JSON.stringify(formData));
}

// stores Data in local storage as you input it
const storedInputs = document.querySelectorAll('input')

storedInputs.forEach(input => Inputs.addEventListener('input', () => {
  storeFormData();
}));




// ############ form validation #############

const form = document.getElementById("form");
const userName = document.getElementById("userName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");


form.addEventListener("submit", (event) => {
  event.preventDefault();

  checkInputs();
  storeFormData();
});

function checkInputs() {
  // gitthe value from the inputs
  const userNameValue = userName.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const password2Value = password2.value.trim();

  if (userNameValue === "") {
    // show error
    // add error class
    setErrorFor(userName, 'UserName cannot be blank')
  } else {
    // add success class
    setSuccessFor(userName);
  }

  if (emailValue === "") {
    // show error
    // add error class
    setErrorFor(email, 'Email cannot be blank')
  }else if (!isEmail(emailValue)) {
    //isEmail function check email valid or not
    setErrorFor(email, 'Email is not valid')
  } else {
    // add success class
    setSuccessFor(email);
  }

  if (passwordValue === "") {
    // show error
    // add error class
    setErrorFor(password, 'Password cannot be blank')
  } else {
    // add success class
    setSuccessFor(password);
  }

  if (password2Value === "") {
    // show error
    // add error class
    setErrorFor(password2, 'Repeat Password cannot be blank')
  } else if (passwordValue !== password2Value) {
    // show error if passwords does not match
    setErrorFor(password2, 'Password does not match')
  } else {
    // add success class
    setSuccessFor(password2);
  }


}

function setErrorFor(input, message) {
  const formControl = input.parentElement; // .form-control
  const small = formControl.querySelector('small');

  // add error message inside small
  small.innerText = message;

  // add error class
  formControl.className = 'form-control error';
}

function setSuccessFor (input) {
  const formControl = input.parentElement; // .form-control

  // add success class
  formControl.className = 'form-control success';
}

function isEmail(email) {
  // this regix test email is valid or not
  return /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(email);
}





