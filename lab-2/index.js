const map = document.getElementById("mapFrame");
const locationInfo = document.getElementById("locationInfo");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        locationInfo.textContent = `Latitude: ${lat.toFixed(
          5
        )}, Longitude: ${lon.toFixed(5)}`;

        map.src = `https://www.google.com/maps?q=${lat},${lon}&output=embed`;
      },
      (error) => {
        alert("Unable to retrieve your location.");
        console.error(error);
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

document
  .getElementById("feedbackForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const comment = document.getElementById("comment").value.trim();

    if (name && email && comment) {
      const feedback = {
        name,
        email,
        comment,
      };
      let feedbackList = JSON.parse(localStorage.getItem("feedbackList")) || [];
      feedbackList.push(feedback);
      localStorage.setItem("feedbackList", JSON.stringify(feedbackList));

      let feedbackMsg = document.getElementById("feedbackMessage");
      if (!feedbackMsg) {
        feedbackMsg = document.createElement("p");
        feedbackMsg.id = "feedbackMessage";
        feedbackMsg.style.marginTop = "10px";
        feedbackMsg.style.color = "green";
        this.parentNode.insertBefore(
          feedbackMsg,
          document.getElementById("feedbackList")
        );
      }
      feedbackMsg.textContent = `Thank you for your feedback, ${name}!`;

      this.reset();

      displayFeedback();
    } else {
      alert("Please fill in all fields.");
    }
  });

function displayFeedback() {
  const feedbackListDiv = document.getElementById("feedbackList");
  const feedbackList = JSON.parse(localStorage.getItem("feedbackList")) || [];

  if (feedbackList.length === 0) {
    feedbackListDiv.innerHTML = "<p>No feedback yet.</p>";
    return;
  }

  feedbackListDiv.innerHTML = feedbackList
    .map(
      (entry) => `
        <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px; border-radius: 5px;">
          <p><strong>Name:</strong> ${entry.name}</p>
          <p><strong>Email:</strong> ${entry.email}</p>
          <p><strong>Comment:</strong> ${entry.comment}</p>
        </div>
      `
    )
    .join("");
}

window.addEventListener("DOMContentLoaded", displayFeedback);
