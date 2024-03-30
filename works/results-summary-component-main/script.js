"use strict";

const fetchData = async () => {
  try {
    const response = await fetch("data.json");
    const data = await response.json();

    const markup = data
      .map(
        (item) => `
        <li class="summary-list-item">
             <div class="type">
                 <span><img src="${item.icon}" alt="" /></span
                 >${item.category}
             </div>
            <div class="score"><span>${item.score}</span> / 100</div>
         </li>
        `
      )
      .join("");

    const ulElement = document.querySelector(".summary-list");
    ulElement.innerHTML = markup;
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};
fetchData();
