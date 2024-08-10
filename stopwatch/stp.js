const startBtn = document.getElementById("start");
const lapBtn = document.getElementById("Lap");
const timerDisplay = document.getElementById("time");

let seconds = 0;
let minutes = 0;
let hours = 0;
let milliseconds = 0;
let intervalId;
let lapCount = 0;

const lapTable = document.createElement("table");
lapTable.id = "laptable";
document.body.appendChild(lapTable);

function updateTimer() {
  milliseconds += 10; 
  if (milliseconds === 100) {
    seconds++;
    milliseconds = 0;
  }
  if (seconds === 60) {
    minutes++;
    seconds = 0;
  }
  if (minutes === 60) {
    hours++;
    minutes = 0;
  }
  timerDisplay.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${padMilliseconds(milliseconds)}`;
}

function pad(number) {
  return (number < 10 ? "0" : "") + number;
}

function padMilliseconds(number) {
  return (number < 100 ? "0" : "") + (number < 10 ? "0" : "") + number;
}

startBtn.addEventListener("click", () => {
  
  if (startBtn.textContent === "Start") {
    intervalId = setInterval(updateTimer, 10);
    startBtn.textContent = "Stop";
    lapBtn.textContent = "Lap";
  } else {
    clearInterval(intervalId);
    startBtn.textContent = "Start";
    lapBtn.textContent = "Reset";
  }
});

lapBtn.addEventListener("click", () => {
  if (lapBtn.textContent === "Lap") {
    lapCount++;
    const lapTime = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${padMilliseconds(milliseconds)}`;
    addLapToTable(lapCount, lapTime);
  } else if (lapBtn.textContent === "Reset") {
    clearInterval(intervalId);
    seconds = 0;
    minutes = 0;
    hours = 0;
    milliseconds = 0;
    timerDisplay.textContent = "00:00:00:00";
    lapBtn.textContent = "Lap";
    lapCount = 0;
    document.getElementById("laptable").innerHTML = "";
    startBtn.textContent = "Start";
  }
});

function addLapToTable(lapNumber, lapTime) {
  const row = document.createElement("tr");
  const lapNumberCell = document.createElement("td");
  const lapTimeCell = document.createElement("td");
  lapNumberCell.textContent = `Lap ${lapNumber}`;
  lapTimeCell.textContent = lapTime;
  row.appendChild(lapNumberCell);
  row.appendChild(lapTimeCell);
  document.getElementById("laptable").appendChild(row);
}