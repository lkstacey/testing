document.addEventListener('DOMContentLoaded', function() {
  const timerDisplay = document.getElementById('timer');
  const startPauseBtn = document.getElementById('startPauseBtn');
  const stopBtn = document.getElementById('stopBtn');
  const alarmAudio = document.getElementById('alarmAudio');
  console.log('alarmAudio:', alarmAudio);
  const intervalSelect = document.getElementById('intervalSelect');
  const applyIntervalBtn = document.getElementById('applyIntervalBtn');

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
        if (alarmAudio) {
          alarmAudio.currentTime = 0;
          alarmAudio.play().catch(() => {
            alert('Time is up!');
          });
          setTimeout(() => {
            alarmAudio.pause();
            alarmAudio.currentTime = 0;
          }, 3000);
        }
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
    intervalSelect.value = "25";
    updateDisplay();
    startPauseBtn.innerHTML = '&#9654;'; // Start icon
    startPauseBtn.title = 'Start';
  }

  startPauseBtn.addEventListener('click', function() {
    if (running) {
      pauseTimer();
    } else {
      startTimer();
    }
  });

  stopBtn.addEventListener('click', stopTimer);

  // Set the select to 25 min by default
  intervalSelect.value = "25";

  applyIntervalBtn.addEventListener('click', function() {
    const mins = parseInt(intervalSelect.value, 10);
    timeLeft = mins * 60;
    updateDisplay();
    clearInterval(timer);
    running = false;
    startPauseBtn.innerHTML = '&#9654;'; // Start icon
    startPauseBtn.title = 'Start';
  });

  updateDisplay();
}); 