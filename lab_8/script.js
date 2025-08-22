const usersContainer = document.getElementById("usersContainer");
const filterForm = document.getElementById("filterForm");
const resetBtn = document.getElementById("resetBtn");

async function fetchUsers(filters = {}) {
  const params = new URLSearchParams(filters);
  const res = await fetch("/api/users?" + params.toString());
  const users = await res.json();
  renderUsers(users);
}

function renderUsers(users) {
  usersContainer.innerHTML = "";
  if (users.length === 0) {
    usersContainer.innerHTML =
      '<div class="col-span-3 text-center text-gray-500">No users found.</div>';
    return;
  }
  users.forEach((user) => {
    const card = document.createElement("div");
    card.className = "bg-white rounded shadow p-4 flex flex-col gap-2";
    card.innerHTML = `
            <h2 class="text-lg font-semibold text-blue-700">${user.name}</h2>
            <div class="text-gray-600">${user.headline}</div>
            <div><span class="font-medium">City:</span> ${user.city}</div>
            <div><span class="font-medium">Age:</span> ${user.age}</div>
            <div><span class="font-medium">Interest:</span> ${user.interest}</div>
            <div class="flex gap-2 mt-2">
              <button class="editBtn bg-blue-400 text-white px-3 py-1 rounded hover:bg-blue-600" data-id="${user.id}">Edit</button>
              <button class="deleteBtn bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-900" data-id="${user.id}">Delete</button>
            </div>
          `;
    usersContainer.appendChild(card);
  });
  document.querySelectorAll(".editBtn").forEach((btn) => {
    btn.addEventListener("click", () => openModal("edit", btn.dataset.id));
  });
  document.querySelectorAll(".deleteBtn").forEach((btn) => {
    btn.addEventListener("click", () => deleteUser(btn.dataset.id));
  });
}

filterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const filters = {
    name: document.getElementById("name").value,
    city: document.getElementById("city").value,
    age: document.getElementById("age").value,
    interest: document.getElementById("interest").value,
  };
  Object.keys(filters).forEach((k) => {
    if (!filters[k]) delete filters[k];
  });
  fetchUsers(filters);
});

resetBtn.addEventListener("click", () => {
  filterForm.reset();
  fetchUsers();
});

const userModal = document.getElementById("userModal");
const modalTitle = document.getElementById("modalTitle");
const userForm = document.getElementById("userForm");
const closeModalBtn = document.getElementById("closeModalBtn");
const addUserBtn = document.getElementById("addUserBtn");

let modalMode = "add";
let editingId = null;

function openModal(mode, id = null) {
  modalMode = mode;
  editingId = id;
  userModal.classList.remove("hidden");
  if (mode === "add") {
    modalTitle.textContent = "Add User";
    userForm.reset();
  } else if (mode === "edit") {
    modalTitle.textContent = "Edit User";
    fetch("/api/users")
      .then((res) => res.json())
      .then((users) => {
        const user = users.find((u) => u.id == id);
        if (user) {
          document.getElementById("modalName").value = user.name;
          document.getElementById("modalCity").value = user.city;
          document.getElementById("modalAge").value = user.age;
          document.getElementById("modalInterest").value = user.interest;
          document.getElementById("modalHeadline").value = user.headline;
        }
      });
  }
}

function closeModal() {
  userModal.classList.add("hidden");
  userForm.reset();
  editingId = null;
}

addUserBtn.addEventListener("click", () => openModal("add"));
closeModalBtn.addEventListener("click", closeModal);

userForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userData = {
    name: document.getElementById("modalName").value,
    city: document.getElementById("modalCity").value,
    age: document.getElementById("modalAge").value,
    interest: document.getElementById("modalInterest").value,
    headline: document.getElementById("modalHeadline").value,
  };
  if (modalMode === "add") {
    await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
  } else if (modalMode === "edit" && editingId) {
    await fetch(`/api/users/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
  }
  closeModal();
  fetchUsers();
});

async function deleteUser(id) {
  if (confirm("Are you sure you want to delete this user?")) {
    await fetch(`/api/users/${id}`, { method: "DELETE" });
    fetchUsers();
  }
}

fetchUsers();
