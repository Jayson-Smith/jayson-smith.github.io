"use strict";

const btn = document.querySelector(".btn");
const day = document.getElementById("day");
const month = document.getElementById("month");
const year = document.getElementById("year");

const showError = function (input, message) {
  const formInput = input.closest(".form-input");
  formInput.querySelector(".main-lbl").classList.add("active");
  formInput.querySelector(".error-lbl").textContent = message;
  formInput.querySelector(".error-lbl").style.opacity = "1";
};

const hideError = function (input) {
  const formInput = input.closest(".form-input");
  formInput.querySelector(".main-lbl").classList.remove("active");
  formInput.querySelector(".error-lbl").style.opacity = "0";
};

const updateResults = function (years, months, days) {
  const numYear = document.getElementById("num-year");
  const numMonth = document.getElementById("num-month");
  const numDay = document.getElementById("num-day");

  numYear.textContent = years;
  numMonth.textContent = months;
  numDay.textContent = days;
};

const validateForm = function () {
  const dayValue = +day.value;
  const monthValue = +month.value;
  const yearValue = +year.value;
  const currentDate = new Date();
  const daysInMonth = new Date(yearValue, monthValue, 0).getDate();

  let errMsg = [];

  if (isNaN(dayValue) || dayValue < 1 || dayValue > 31) {
    errMsg.push({ field: "day", message: "Must be a valid day (1-31)" });
  } else {
    hideError(day);
  }

  if (
    isNaN(monthValue) ||
    monthValue < 1 ||
    monthValue > 12
  ) {
    errMsg.push({
      field: "month",
      message: "Must be a valid month (1-12)",
    });
  } else {
    hideError(month);
  }

  if (
    isNaN(yearValue) ||
    yearValue < 1000 ||
    yearValue > currentDate.getFullYear()
  ) {
    errMsg.push({
      field: "year",
      message: "Must be a valid year (In the past)",
    });
  } else {
    hideError(year);
  }

  if (dayValue > daysInMonth) {
    errMsg.push({
      field: "day",
      message: `This month only has (1-${daysInMonth})`,
    });
  } else {
    hideError(day);
  }

  if (errMsg.length > 0) {
    errMsg.forEach(({ field, message }) => {
      showError(document.getElementById(field), message);
    });
    return false;
  } else {
    return true;
  }
};

btn.addEventListener("click", function (e) {
  e.preventDefault();

  if (validateForm()) {
    const dayValue = +day.value;
    const monthValue = +month.value;
    const yearValue = +year.value;

    const birthDate = new Date(yearValue, monthValue - 1, dayValue);
    const currentDate = new Date();
    const ageInMilliseconds = currentDate - birthDate;

    const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25;
    const years = Math.floor(ageInMilliseconds / millisecondsInYear);
    const remainingMilliseconds = ageInMilliseconds % millisecondsInYear;
    const months = Math.floor(
      remainingMilliseconds / (1000 * 60 * 60 * 24 * 30.44)
    );
    const days = Math.floor(
      (remainingMilliseconds / (1000 * 60 * 60 * 24)) % 30.44
    );

    updateResults(years, months, days);
  }
});
