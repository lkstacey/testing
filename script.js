const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const pauseBtn = document.getElementById('pauseBtn');
const intervalSelect = document.getElementById('intervalSelect');

let timer;
let timeLeft = 25 * 60; // 25 minutes in seconds
let running = false;

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = 
    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
  if (running) return;
  running = true;
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    } else {
      clearInterval(timer);
      running = false;
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
  running = false;
  timeLeft = 25 * 60;
  updateDisplay();
}

function pauseTimer() {
  clearInterval(timer);
  running = false;
}

intervalSelect.addEventListener('change', function() {
  const value = parseInt(intervalSelect.value, 10);
  timeLeft = Math.max(0, timeLeft + value * 60);
  updateDisplay();
  // Reset dropdown to default after applying
  intervalSelect.selectedIndex = 0;
});

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
pauseBtn.addEventListener('click', pauseTimer);

updateDisplay(); 