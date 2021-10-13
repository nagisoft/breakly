const circleProgress = document.querySelector(".circle-progress");
const start = document.querySelector(".start");
const instructions = document.querySelector(".instructions");



// Circle
const growCircle = () => {
  circleProgress.classList.add("circle-grow");
  setTimeout(() => {
    circleProgress.classList.remove("circle-grow");
  }, 8000);
};

// Breathing Instructions
const breathTextUpdate = () => {
  instructions.innerText = "Breath in";
  setTimeout(() => {
    instructions.innerText = "Hold Breath";
    setTimeout(() => {
      instructions.innerText = "Exhale Slowly";
    }, 4000);
  }, 4000);
};

// Breathing App Function
const breathingApp = () => {
  const breathingAnimtaion = setInterval(() => {
    growCircle();
    breathTextUpdate();
  }, 12000);
};

// Start Breathing
start.addEventListener("click", () => {
  setTimeout(() => {
    start.classList.add("button-inactive");
    instructions.innerText = "Starting Soon...";
    setTimeout(() => {
      breathingApp();
      growCircle();
      breathTextUpdate();
    }, 2000);
  }, 2000);
});
