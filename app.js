const slides = document.querySelectorAll(".form-slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".Next");
let currentSlide = 0;
let validate = true;
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const formError = document.querySelectorAll(".form-error");
const phoneNumber = document.getElementById("number");

const confirmBtn = document.querySelector(".confirm");

const numberIndicator = document.querySelectorAll(".number");

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   console.log(regex);
  return regex.test(email);
}
const isValidEmail = validateEmail(emailInput.value);
function validatePhone(number) {
  const phoneNumberRegex = /^\d{3}-\d{3}-\d{4}$/;
  return phoneNumberRegex.test(number);
}
const validPhone = validatePhone(phoneNumber.value);

// prevBtn.addEventListener("click", () => {
//   currentSlide--;
//   showSlide();
// });
confirmBtn.addEventListener("click", () => {
  if (currentSlide < slides.length - 1) {
    currentSlide++;
    showSlide();
  }
});

prevBtn.addEventListener("click", () => {
  currentSlide--;
  showSlide();
});

nextBtn.addEventListener("click", () => {
  const isValidEmail = validateEmail(emailInput.value);
  numberIndicator.forEach((number) => {
    if (number === currentSlide) {
    }
  });
  if (
    nameInput.value === "" &&
    emailInput.value === "" &&
    phoneNumber.value === ""
  ) {
    formError.forEach((error) => {
      error.style.display = "inline";
    });
  } else if (
    nameInput.value === "" &&
    emailInput.value !== "" &&
    phoneNumber.value !== ""
  ) {
    formError[0].style.display = "inline";
    // formError[1].textContent = "Not valid email";
    formError[1].style.display = "none";
    formError[2].style.display = "none";
  } else if (
    nameInput.value !== "" &&
    emailInput.value === "" &&
    phoneNumber.value !== ""
  ) {
    formError[1].style.display = "inline";
    // formError[1].textContent = "Not valid email";
    formError[0].style.display = "none";
    formError[2].style.display = "none";
  } else if (
    nameInput.value !== "" &&
    emailInput.value !== "" &&
    phoneNumber.value === ""
  ) {
    formError[2].style.display = "inline";
    // formError[1].textContent = "Not valid email";
    formError[0].style.display = "none";
    formError[1].style.display = "none";
  } else if (
    !isValidEmail &&
    nameInput.value !== "" &&
    phoneNumber.value !== ""
  ) {
    formError[1].style.display = "inline";
    formError[1].textContent = "Not valid email";
    formError[0].style.display = "none";
    formError[2].style.display = "none";
  } else {
    formError.forEach((error) => {
      error.style.display = "none";
    });
    currentSlide++;
    showSlide();
  }
});

function showSlide() {
  slides.forEach((slide, index) => {
    if (index === currentSlide) {
      slide.style.display = "block";
    } else {
      slide.style.display = "none";
    }
  });

  numberIndicator.forEach((indicator, index) => {
    if (index === currentSlide) {
      indicator.classList.add("progress-active");
    } else {
      indicator.classList.remove("progress-active");
    }
  });

  if (currentSlide === 3) {
    confirmBtn.style.display = "block";
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
  } else if (currentSlide > 3) {
    confirmBtn.style.display = "none";
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
  } else {
    confirmBtn.style.display = "none";
    prevBtn.style.display = currentSlide === 0 ? "none" : "block";
    nextBtn.style.display = "block";
  }

  if (currentSlide === 0) {
    prevBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
  }

  if (currentSlide === slides.length - 1) {
    nextBtn.disabled = true;
  } else {
    nextBtn.disabled = false;
  }
}
