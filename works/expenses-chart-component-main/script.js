const fetchData = async function() {
  try {
    const respons = await fetch('data.json');
    const jsonData = await respons.json();
    updateContent(jsonData);
    fillingBars(jsonData);
    calculateTotalAmount(jsonData);
    console.log(jsonData);
  }
  catch (error) {
    console.error("Error fetching JSON:", error);
  }
}

const updateContent = function(jsonData) {
  const days = document.querySelectorAll('.day');
  const currentDate = new Date();
  const currentDayIndex = currentDate.getDay() - 1;

  if (currentDayIndex === -1) {
    currentDayIndex = 6; 
  }

  days.forEach((day, index) => {
    const amount = day.querySelector('.amount');
    const dayName = day.querySelector('.day-name');
    amount.textContent = `$${jsonData[index].amount}`
    dayName.textContent = `${jsonData[index].day}`

    if (currentDayIndex === index) {
      day.classList.add('current-day');
    } else {
      day.classList.remove('current-day');
    }

  })
}

const calculateTotalAmount = (jsonData) => { 
  const total = document.querySelector('.total');

  const totalAmount = jsonData.reduce((accumulator, currentValue) =>
   accumulator + currentValue.amount, 0);

  // total.textContent = `$${totalAmount}`
  console.log("Total amount:", totalAmount);
}


// const renderBarChart = (jsonData) => {
//   const days = document.querySelectorAll('.day');
//   const maxAmount = Math.max(...jsonData.map(item => item.amount));

//   days.forEach((day, index) => {
//     const amount = jsonData[index].amount;
//     const bar = day.querySelector('.bar');
//     const height = Math.min((amount / maxAmount) * 150, 150); // Calculate height, capped at 150px
//     bar.style.height = height + 'px';
//   });
// };

let progress = 0;
const increment = 1; // Change the increment value as needed

function fillingBars(jsonData) {
  const days = document.querySelectorAll('.day');

  const fillInterval = setInterval(() => {
    progress += increment;

    if (progress > 50) {
      clearInterval(fillInterval);
      return;
    }

    days.forEach((day, index) => {
      const amount = jsonData[index].amount;
      const bar = day.querySelector('.bar');
      const maxAmount = Math.max(...jsonData.map(item => item.amount));
      const height = Math.min((amount / maxAmount) * 150 * (progress / 50), 150); // Calculate height based on progress
      bar.style.height = height + 'px';
    });
  }, 20); // Adjust the interval as needed
}

// fetchData().then(updateContent).catch(error => {
//   console.error("Error rendering bar chart:", error);
// });

fetchData();