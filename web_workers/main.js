const input = document.getElementById("fibInput");
const button = document.getElementById("calculateBtn");
const resultSpan = document.getElementById("result");
const stat = document.getElementById("stat");

let worker;

if (window.Worker) {
  worker = new Worker("worker.js");

  worker.onmessage = function (e) {
    resultSpan.textContent = e.data;
    stat.textContent = "Done!";
  };

  worker.onerror = function (e) {
    console.error("Worker error:", e.message);
    stat.textContent = "An error occurred.";
  };
} else {
  alert("Web Workers are not supported in this browser.");
}

button.addEventListener("click", () => {
  const n = parseInt(input.value, 10);
  if (isNaN(n) || n < 0) {
    stat.textContent = "Please enter a valid non-negative number.";
    return;
  }

  stat.textContent = "Calculating...";
  resultSpan.textContent = "-";
  worker.postMessage(n);
});
