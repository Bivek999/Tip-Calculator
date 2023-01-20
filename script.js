// "use strict";
const billInput = document.querySelector(".bill-input");
const peopleInput = document.querySelector(".people-input");
const tipPerPerson = document.getElementById("tip-amount");
const totalPerPerson = document.getElementById("total-amount");
const tips = document.querySelectorAll(".tips");
const tip = document.querySelector(".tip-custom");
const resetbtn = document.querySelector(".reset");
const error = document.querySelector(".error");

billInput.addEventListener("input", billInputFun);
peopleInput.addEventListener("input", peopleInputFun);

tips.forEach(function (val) {
  val.addEventListener("click", handleClick);
});
tip.addEventListener("input", tipInputFun);
resetbtn.addEventListener("click", reset);

billInput.value = "0.0";
peopleInput.value = "1";
tipPerPerson.innerHTML = "$" + (0.0).toFixed(2);
totalPerPerson.innerHTML = "$" + (0.0).toFixed(2);

let billval = 0.0;
let peopleval = 1;
let tipval = 0.15;
function billInputFun() {
  billval = parseFloat(billInput.value);

  calculateTip();
}
function peopleInputFun() {
  peopleval = parseFloat(peopleInput.value);
  if (peopleval < 1) {
    error.style.display = "flex";
    peopleInput.style.border = "thick solid red";
  } else {
    error.style.display = "none";
    peopleInput.style.border = "none";
  }
  calculateTip();
}
function tipInputFun() {
  tipval = parseFloat(tip.value / 100);
  tips.forEach(function (val) {
    val.classList.remove("active-tip");
  });
  calculateTip();
}

function handleClick(event) {
  tips.forEach(function (val) {
    val.classList.remove("active-tip");
    if (event.target.innerHTML == val.innerHTML) {
      val.classList.add("active-tip");
      tipval = parseFloat(val.innerHTML) / 100;
    }
  });
  calculateTip();
}

function calculateTip() {
  if (peopleval >= 1) {
    let tipAmount = (billval * tipval) / peopleval;
    let total = (billval + tipAmount) / peopleval;
    tipPerPerson.innerHTML = "$" + tipAmount.toFixed(2);
    totalPerPerson.innerHTML = "$" + total.toFixed(2);
  }
}

function reset() {
  billInput.value = "0.0";
  billInputFun();
  peopleInput.value = "1";
  peopleInputFun();
  tip.value = "";
}
