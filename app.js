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

const plans = document.querySelectorAll(".grid-card");
const serviceTitle = document.querySelector(".servicetitle");
const planPrice = document.querySelector(".plan-price");

const planError = document.querySelector(".plan-error");
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

const checkboxes = document.querySelectorAll(".check-box");
const serviceTitles = document.querySelectorAll(".service-title");
const addOnPricings = document.querySelectorAll(".add-On-pricing");

const checkOutContainer = document.querySelector(".check-out");

// =======================SELECTORS FOR CALCULATIONS============================

const toggleLabel = document.querySelector(".toggle-label");
const toggleInput = document.querySelector(".toggle-input");
const yearLabel = document.querySelector(".year");
const monthLabel = document.querySelector(".month");
const subPrice = document.querySelectorAll(".sub-price");
const addOnPrice = document.querySelectorAll(".add-On-price");
const planPricing = document.querySelector(".plan-pricing");
const total = document.querySelector(".total");

// function planMath() {

// }

checkboxes.forEach((checkbox, index) => {
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      // Get the service title and add-on pricing for this checkbox
      const serviceTit = serviceTitles[index].textContent;
      const addOnPricing = addOnPricings[index].textContent;

      // Create a new checkout add-ons container
      const newContainer = document.createElement("div");
      newContainer.classList.add("check-out-add-ons");

      // Create a new add-ons element with the service title and add-on pricing
      const addOns = document.createElement("p");
      addOns.classList.add("add-ons");
      addOns.textContent = serviceTit;
      newContainer.appendChild(addOns);

      // Create a new add-ons pricing element with the add-on pricing
      const addOnsPricing = document.createElement("h4");
      addOnsPricing.classList.add("add-ons-pricing");
      addOnsPricing.textContent = addOnPricing;
      newContainer.appendChild(addOnsPricing);

      // Add the new container to the check-out container
      checkOutContainer.appendChild(newContainer);
    } else {
      // Remove the corresponding checkout add-ons container
      const containerToRemove = document.querySelector(".check-out-add-ons");
      if (containerToRemove) {
        containerToRemove.remove();
      }
    }
  });
});

let selectedPlan = null;

toggleLabel.addEventListener("click", () => {
  setTimeout(() => {
    if (toggleInput.checked) {
      monthLabel.style.color = "#aeaeba";
      monthLabel.style.fontWeight = "normal";
      yearLabel.style.color = "#04295d";
      yearLabel.style.fontWeight = "bolder";
    } else {
      yearLabel.style.color = "#aeaeba";
      yearLabel.style.fontWeight = "normal";
      monthLabel.style.color = "#04295d";
      monthLabel.style.fontWeight = "bolder";
    }
  }, 10);
});

// get all the grid cards
// get all the grid cards
const gridCards = document.querySelectorAll(".grid-card");

// loop through each grid card
gridCards.forEach((card, index) => {
  // get the sub pricing and plan price elements
  const subPricing = card.querySelector(".sub-pricing .sub-price");
  const planPrice = document.querySelector(".plan-price");

  // set the initial plan price to the sub pricing of this card
  planPrice.textContent = subPricing.textContent;

  // attach a click event listener to the card
  card.addEventListener("click", () => {
    // update the plan price to the sub pricing of this card
    planPrice.textContent = subPricing.textContent;

    // call the toggleLabelClickHandler with the subPricing element
    toggleLabelClickHandler(subPricing);
  });

  // define an event handler for the toggle label click
  const toggleLabelClickHandler = (subPriceElement) => {
    // check if the toggle input is checked
    if (toggleInput.checked) {
      // update the plan price to the multiplied sub pricing of this card
      planPrice.textContent = subPriceElement.textContent * 10;
    } else {
      // update the plan price to the sub pricing of this card
      planPrice.textContent = subPriceElement.textContent;
    }
  };

  // attach a click event listener to the toggle label
  toggleLabel.addEventListener("click", (event) => {
    // prevent the default behavior of the checkbox from toggling
    event.preventDefault();

    // call the toggleLabelClickHandler with the subPricing element
    toggleLabelClickHandler(subPricing);

    // toggle the checkbox state
    toggleInput.checked = !toggleInput.checked;
  });
});

numberIndicator.forEach((number, index) => {
  number.addEventListener("click", () => {
    currentSlide = index;
    showSlide();
  });
});
plans.forEach((plan, index) => {
  plan.addEventListener("click", () => {
    // remove the class from all plans
    if (toggleInput.checked) {
      let calculatedPanPrice = subPrice[index].textContent * 10;
      const newpric = (document.querySelector(
        ".plan-price"
      ).textContent = `$${calculatedPanPrice}/Yr`);
      console.log(newpric);
    } else {
      planPrice.textContent = plan.querySelector(".sub-pricing").textContent;
    }
    plans.forEach((p) => {
      p.classList.remove("plan-clicked");
    });
    // add the class to the clicked plan
    plan.classList.add("plan-clicked");
    planError.style.display = "none";
    // console.log(indexOf(plan));

    // store a reference to the clicked plan
    serviceTitle.textContent = plan.querySelector(".sub-title").textContent;

    selectedPlan = plan;
  });
});

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
  } else if (currentSlide === 1 && !selectedPlan) {
    planError.style.display = "block";
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
