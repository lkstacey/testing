const timerDisplay = document.getElementById('timer');
const startPauseBtn = document.getElementById('startPauseBtn');
const stopBtn = document.getElementById('stopBtn');
const add5Btn = document.getElementById('add5Btn');
const sub5Btn = document.getElementById('sub5Btn');

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
  startPauseBtn.innerHTML = '&#10073;&#10073;'; // Pause icon
  startPauseBtn.title = 'Pause';
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    } else {
      clearInterval(timer);
      running = false;
      startPauseBtn.innerHTML = '&#9654;'; // Start icon
      startPauseBtn.title = 'Start';
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  running = false;
  startPauseBtn.innerHTML = '&#9654;'; // Start icon
  startPauseBtn.title = 'Start';
}

function stopTimer() {
  clearInterval(timer);
  running = false;
  timeLeft = 25 * 60;
  updateDisplay();
  startPauseBtn.innerHTML = '&#9654;'; // Start icon
  startPauseBtn.title = 'Start';
}

function addMinutes(mins) {
  timeLeft = Math.max(0, timeLeft + mins * 60);
  updateDisplay();
}

startPauseBtn.addEventListener('click', function() {
  if (running) {
    pauseTimer();
  } else {
    startTimer();
  }
});

stopBtn.addEventListener('click', stopTimer);
add5Btn.addEventListener('click', function() { addMinutes(5); });
sub5Btn.addEventListener('click', function() { addMinutes(-5); });

updateDisplay(); 