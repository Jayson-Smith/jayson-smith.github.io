"use strict";

const channelsContainer = document.querySelector(".works-guide");
const descriptionBox = document.querySelector(".work-description");
const previewImgBox = document.querySelector(".preview-img");

let jsonData;
let images = [];

async function fetchData() {
  try {
    const response = await fetch("../data.json");
    jsonData = await response.json();
    preloadImages(jsonData);
    updateChannels();
    console.log(jsonData);
  } catch (error) {
    console.error("Error fetching JSON", error);
  }
}

// Function to preload images
function preloadImages(data) {
  data.forEach((item) => {
    const img = new Image();
    img.src = item.img;
    images.push(img); // Add image object to the array
  });
}

const updateChannels = function () {
  const worksGuide = document.querySelector(".works-guide");
  const totalColumns = 4; // Total number of columns
  let remainingColumns = totalColumns;

  let markup = "";

  let isFirstChannel = true;
  let firstChannelData = null; // Variable to store the data of the first channel

  jsonData.forEach((channel) => {
    let channelSpans = "";
    let channelNameMarkup = "";

    while (remainingColumns > 0) {
      // Generate a random number between 1 and the remaining number of columns
      const randomSpan = Math.floor(Math.random() * remainingColumns) + 1;
      channelSpans += ` span-${randomSpan}`;

      // Deduct the random span from remaining columns
      remainingColumns -= randomSpan;

      // Create <p> elements for the channel name with appropriate spans
      channelNameMarkup += `<p class="channel-name span-${randomSpan}">${channel.title}</p>`;
    }

    // Reset remaining columns for the next channel
    remainingColumns = totalColumns;

    // Add data-channel-data attribute to store channel data
    const channelDataAttribute = `data-channel-data='${JSON.stringify(
      channel
    )}'`;

    // Add channel markup
    markup += `
      <div class="channel" ${channelDataAttribute}>
        <div class="channel-info ${isFirstChannel ? "channel-active" : ""}">
          <div class="abrv">${channel.channelAbv}</div>
          <div class="channel-num">${channel.channel}</div>
        </div>
        ${channelNameMarkup}
      </div>
    `;

    // Store the data of the first channel
    if (isFirstChannel) {
      firstChannelData = channel;
      isFirstChannel = false;
    }
  });

  worksGuide.innerHTML = markup;

  // If there is data for the first channel, display its info
  if (firstChannelData) {
    updateDescriptionBox(
      firstChannelData,
      document.querySelector(".channel-info.channel-active")
    );
  }
};

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

function updateDescriptionBox(channelData, element) {
  // Generate tags HTML by iterating over the keys of the tags object
  let tagsHTML = "";
  for (const key in channelData.tags) {
    if (Object.hasOwnProperty.call(channelData.tags, key)) {
      tagsHTML += `<span class="tag">${channelData.tags[key]}</span>`;
    }
  }

  // Get the number of columns the clicked element spans
  const spanClass = Array.from(element.classList).find((cls) =>
    cls.startsWith("span-")
  );
  const numColumns = spanClass ? parseInt(spanClass.slice(5)) : 1;

  // Calculate the end time based on the current time and the number of columns
  const currentTime = new Date();
  const endTime = new Date(currentTime);
  endTime.setMinutes(currentTime.getMinutes() + numColumns * 30);
  endTime.setMinutes(endTime.getMinutes() < 30 ? 0 : 30);

  const startTime = new Date(currentTime);
  startTime.setMinutes(startTime.getMinutes() < 30 ? 0 : 30);

  // Format the start time
  const startTimeFormatted = startTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Format the end time
  const endTimeFormatted = endTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Update description box content
  descriptionBox.innerHTML = `
    <div class="description-text-box">
      <h2 class="title">${channelData.title}</h2>
      <div class="desc-time-channel-box">
        <p class="desc-time">${startTimeFormatted} - ${endTimeFormatted}</p>
        <p class="desc-channel">${channelData.channel} ${channelData.channelAbv}</p>
      </div>
      <div class="tags">
        ${tagsHTML}
      </div>
      <p class="description">${channelData.description}</p>
      <div class="page-link">
        <a class="go-to-page" href="${channelData.url}">&rarr; View Channel</a>
      </div>
    </div>
  `;

  // Update preview image
  const previewImg = document.createElement("img");
  previewImg.src = channelData.img;
  previewImg.alt = channelData.title;

  // Replace existing preview image with the new one
  const existingPreviewImg = document.querySelector(".preview-img img");
  if (existingPreviewImg) {
    previewImgBox.replaceChild(previewImg, existingPreviewImg);
  } else {
    previewImgBox.appendChild(previewImg);
  }
}

// Attach click event listener to the container
channelsContainer.addEventListener("click", function (event) {
  // Get the clicked element
  const clickedElement = event.target.closest(".channel-name");
  if (clickedElement) {
    // Retrieve channel data from clicked channel element
    const clickedChannel = clickedElement.closest(".channel");
    const channelData = JSON.parse(clickedChannel.dataset.channelData);

    // Update description box content passing clicked element
    updateDescriptionBox(channelData, clickedElement);

    // Remove 'channel-active' class from all '.channel-info' elements
    const allChannelInfo = document.querySelectorAll(".channel-info");
    allChannelInfo.forEach((channelInfo) => {
      channelInfo.classList.remove("channel-active");
    });

    // Add 'channel-active' class to the '.channel-info' element of the clicked channel
    const clickedChannelInfo = clickedChannel.querySelector(".channel-info");
    if (clickedChannelInfo) {
      clickedChannelInfo.classList.add("channel-active");
    }
  }
});

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
function updateTimes() {
  const times = document.querySelectorAll(".time");
  const currentTime = new Date();
  let initialHour = currentTime.getHours();
  let initialMinute = currentTime.getMinutes() < 30 ? 0 : 30;

  let hour = initialHour;
  let minute = initialMinute;
  times.forEach((time, index) => {
    // Format hour and minute to have leading zero if less than 10
    const formattedHour =
      hour < 10 ? "0" + hour : hour > 12 ? "0" + (hour - 12) : hour;
    const formattedMinute = minute < 10 ? "0" + minute : minute;
    const am_pm = hour < 12 ? "AM" : "PM";

    // Set the time for this element
    time.textContent = `${formattedHour}:${formattedMinute} ${am_pm}`;

    // Increment time by 30 minutes for the next element
    minute += 30;
    if (minute >= 60) {
      hour++;
      minute -= 60;
    }
  });
}

// Call the function when the page loads
updateTimes();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  const hourFirstDigit = document.querySelector(".hours .first .number");
  const hourSecondDigit = document.querySelector(".hours .second .number");
  const minuteFirstDigit = document.querySelector(".minutes .first .number");
  const minuteSecondDigit = document.querySelector(".minutes .second .number");

  hourFirstDigit.textContent = hours[0];
  hourSecondDigit.textContent = hours[1];
  minuteFirstDigit.textContent = minutes[0];
  minuteSecondDigit.textContent = minutes[1];
}

updateClock();

setInterval(updateClock, 1000);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function updateDates() {
  const now = new Date();
  const dayNames = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
  const dayNamesFull = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = dayNames[now.getDay()];
  const dayFull = dayNamesFull[now.getDay()];
  const date = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const monthName = monthNames[now.getMonth()];
  const year = String(now.getFullYear());

  const dateEl = document.querySelector(".date");
  // const weatherDayEl = document.querySelector(".weather-day");
  // const weatherDateEl = document.querySelector(".weather-date");

  dateEl.textContent = `${day} ${month}/${date}`;
  // weatherDayEl.textContent = `${dayFull}`;
  // weatherDateEl.textContent = `${monthName} ${date}, ${year}`;
}

updateDates();

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
  const pageElement = document.querySelector(".page");
  let baseFrequency = 8.58;
  let direction = 1;

  async function updateFilter() {
    // Fetch the SVG data
    const svgResponse = await fetchSvgData();

    pageElement.style.background = `url("data:image/svg+xml,${encodeURIComponent(
      svgResponse
    )}")`;
  }

  function fetchSvgData() {
    // Create the SVG filter dynamically
    const svgFilter = `
      <svg viewBox='0 0 500 500' opacity="0.40" xmlns='http://www.w3.org/2000/svg'>
        <filter id='noiseFilter'>
          <feTurbulence type='fractalNoise' baseFrequency='${baseFrequency}' numOctaves='1' stitchTiles='stitch'/>
        </filter>
        <rect width='100%' height='100%' filter='url(#noiseFilter)'/>
      </svg>
    `;
    return svgFilter;
  }

  setInterval(() => {
    // Update baseFrequency
    baseFrequency += 0.01 * direction;
    // If baseFrequency exceeds 0.1 or goes below 0.01, change direction
    if (baseFrequency >= 8.62 || baseFrequency <= 8.58) {
      direction *= -1;
    }
    // Update the filter dynamically
    updateFilter();
  }, 100); // Adjust the interval as needed

  // Initial filter application
  updateFilter();
});

///////////////////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".section");
  const scrollContainer = document.querySelector(".works-guide"); // Assuming this is your scrollable element
  let currentSectionIndex = 0;

  sections[currentSectionIndex].classList.add("active");

  function calculateTop(index) {
    const topValue = index * 100;
    return topValue < 0 ? 0 : topValue + "vh";
  }

  // Function to scroll to a specific section
  function scrollToSection(sectionIndex) {
    currentSectionIndex = sectionIndex;
    sections.forEach((section, index) => {
      section.style.top = calculateTop(index - currentSectionIndex);
    });

    sections.forEach((section, index) => {
      section.classList.toggle("active", index === currentSectionIndex);
    });
  }

  // Event listener for "What to Watch" link
  const whatToWatchLink = document.querySelector(".what-to-watch");
  whatToWatchLink.addEventListener("click", function (event) {
    event.preventDefault();
    scrollToSection(1); // Scroll to the second section
  });

  // Scroll event listener
  document.addEventListener("wheel", function (event) {
    if (
      event.target === scrollContainer ||
      scrollContainer.contains(event.target)
    ) {
      return;
    }

    event.preventDefault();
    const direction = event.deltaY > 0 ? 1 : -1;
    const newSectionIndex = Math.max(
      0,
      Math.min(currentSectionIndex + direction, sections.length - 1)
    );
    scrollToSection(newSectionIndex);
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnsOpenModal = document.querySelectorAll(".show-modal");

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener("click", openModal);
}

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

fetchData();
