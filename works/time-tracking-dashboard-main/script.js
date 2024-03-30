const body = document.querySelector("body");
const profileControl = document.querySelector(".profile-control");
const toggle = document.querySelector(".toggle");

let selectedTimeframe = "weekly";
let jsonData;

toggle.addEventListener("click", function (e) {
  const modeText = document.querySelector(".mode");
  const toggleMode = e.target.closest(".btn");

  if (toggleMode || toggle) {
    body.classList.toggle("light");
  }

  if (body.classList.contains("light")) {
    modeText.textContent = "Light Mode";
  } else {
    modeText.textContent = "Dark Mode";
  }
});

async function fetchData() {
  try {
    const response = await fetch("data.json");
    jsonData = await response.json();
    console.log(jsonData);
    updateCardContents();
  } catch (error) {
    console.error("Error fetching JSON:", error);
  }
}

const updateCardContents = function () {
  jsonData.forEach((item) => {
    const card = document.querySelector(
      `.card.${item.title.replace(/\s+/g, "-").toLowerCase()}`
    );

    if (card) {
      card.querySelector(".card-name").textContent = `${item.title}`;
      card.querySelector(
        ".current-hrs"
      ).textContent = `${item.timeframes[selectedTimeframe].current}`;
      card.querySelector(
        ".prev-hrs"
      ).textContent = `${item.timeframes[selectedTimeframe].previous}`;
    }
  });
};

const formatTimePeriod = function (selectedTimeframe) {
  switch (selectedTimeframe) {
    case "daily":
      return "Yesterday";
    case "weekly":
      return "Last week";
    case "monthly":
      return "Last month";
    default:
      return "";
  }
};

profileControl.addEventListener("click", function (e) {
  const label = e.target.closest(".lbl");
  const timePeriod = document.querySelectorAll(".time-period");

  if (!label) return;

  selectedTimeframe = label.textContent.toLowerCase();
  timePeriod.forEach(
    (c) => (c.textContent = formatTimePeriod(selectedTimeframe))
  );

  const associatedRadioButton = document.getElementById(
    label.getAttribute("for")
  );
  console.log(associatedRadioButton);

  setTimeout(() => {
    if (associatedRadioButton.checked) {
      updateCardContents();
    }
  }, 0);
});

fetchData();
