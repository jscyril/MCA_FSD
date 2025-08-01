document.addEventListener("DOMContentLoaded", () => {
  const feedbackForm = document.getElementById("feedbackForm");
  const feedbackDisplay = document.getElementById("feedbackDisplay");
  const clearBtn = document.getElementById("clearFeedbacks");
  const comments = document.getElementById("comments");
  const charCount = document.getElementById("charCount");
  const welcomeMsg = document.getElementById("welcomeMsg");

  if (sessionStorage.getItem("visited")) {
    welcomeMsg.classList.remove("hidden");
  } else {
    sessionStorage.setItem("visited", "true");
  }

  comments.addEventListener("input", () => {
    charCount.textContent = comments.value.length;
  });

  displayFeedbacks();

  feedbackForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const feedback = {
      fullname: document.getElementById("fullname").value,
      email: document.getElementById("email").value,
      department: document.getElementById("department").value,
      rating: document.querySelector('input[name="rating"]:checked').value,
      comments: document.getElementById("comments").value,
      submittedAt: new Date().toISOString(),
    };

    let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
    feedbacks.push(feedback);
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

    feedbackForm.reset();
    charCount.textContent = "0";

    displayFeedbacks();
  });

  clearBtn.addEventListener("click", () => {
    localStorage.removeItem("feedbacks");
    displayFeedbacks();
  });

  function displayFeedbacks() {
    let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
    feedbackDisplay.innerHTML = "";

    if (feedbacks.length === 0) {
      feedbackDisplay.innerHTML =
        '<p class="text-gray-700 text-center">No feedbacks submitted yet.</p>';
      return;
    }

    feedbacks.forEach((fb) => {
      const card = document.createElement("div");
      card.className = "bg-white shadow-md rounded px-4 py-4";
      card.innerHTML = `
        <h2 class="text-xl font-bold mb-2">${fb.fullname}</h2>
        <p class="text-gray-600 mb-1"><strong>Email:</strong> ${fb.email}</p>
        <p class="text-gray-600 mb-1"><strong>Department:</strong> ${
          fb.department
        }</p>
        <p class="text-gray-600 mb-1"><strong>Rating:</strong> ${fb.rating}</p>
        <p class="text-gray-600 mb-1"><strong>Comments:</strong> ${
          fb.comments
        }</p>
        <p class="text-gray-500 text-sm">Submitted at: ${new Date(
          fb.submittedAt
        ).toLocaleString()}</p>
      `;
      feedbackDisplay.appendChild(card);
    });
  }
});
