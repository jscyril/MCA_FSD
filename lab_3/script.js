function updateHighlights() {
  document.querySelectorAll(".radio-label").forEach((label) => {
    const input = label.querySelector('input[type="radio"]');
    if (input.checked) {
      label.classList.add("highlighted-label");
    } else {
      label.classList.remove("highlighted-label");
    }
  });
  document.querySelectorAll(".checkbox-label").forEach((label) => {
    const input = label.querySelector('input[type="checkbox"]');
    if (input.checked) {
      label.classList.add("highlighted-label");
    } else {
      label.classList.remove("highlighted-label");
    }
  });
}
document
  .querySelectorAll('input[type="radio"], input[type="checkbox"]')
  .forEach((input) => {
    input.addEventListener("change", updateHighlights);
  });
updateHighlights();

document
  .getElementById("feedbackForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const fullName = document.querySelector("#fullName").value;
    const email = document.querySelector("#email").value;
    const domainField = document.querySelector("#domainField").value;
    const feedbackText = document.querySelector("#feedbackText").value;
    const preferredTime =
      document.querySelector('input[name="preferredTime"]:checked')?.value ||
      "";
    const feedbackType =
      document.querySelector('input[name="feedbackType"]:checked')?.value || "";
    const serviceLevels = Array.from(
      document.querySelectorAll('input[name="serviceLevel"]:checked')
    ).map((cb) => cb.value);

    const output = `
Full Name: ${fullName}
Email: ${email}
Username: ${domainField}
Feedback: ${feedbackText}
Preferred Time: ${preferredTime}
Service Level: ${serviceLevels.join(", ") || "None"}
Feedback Type: ${feedbackType}
`.trim();

    document.getElementById("outputData").textContent = output;
    document.getElementById("output").classList.remove("hidden");
  });
