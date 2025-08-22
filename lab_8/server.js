const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

let users = [
  {
    id: 1,
    name: "Aarav Sharma",
    city: "Mumbai",
    age: 28,
    interest: "Software Engineering",
    headline: "Full Stack Developer",
  },
  {
    id: 2,
    name: "Priya Singh",
    city: "Delhi",
    age: 32,
    interest: "Data Science",
    headline: "Data Scientist",
  },
  {
    id: 3,
    name: "Rahul Verma",
    city: "Bangalore",
    age: 25,
    interest: "Marketing",
    headline: "Marketing Manager",
  },
];
let nextId = 4;

app.get("/api/users", (req, res) => {
  let filtered = users;
  const { name, city, age, interest } = req.query;
  if (name)
    filtered = filtered.filter((u) =>
      u.name.toLowerCase().includes(name.toLowerCase())
    );
  if (city)
    filtered = filtered.filter((u) =>
      u.city.toLowerCase().includes(city.toLowerCase())
    );
  if (age) filtered = filtered.filter((u) => u.age == age);
  if (interest)
    filtered = filtered.filter((u) =>
      u.interest.toLowerCase().includes(interest.toLowerCase())
    );
  res.json(filtered);
});

app.post("/api/users", (req, res) => {
  const { name, city, age, interest, headline } = req.body;
  if (!name || !city || !age || !interest || !headline) {
    return res.status(400).json({ error: "All fields are required." });
  }
  const newUser = { id: nextId++, name, city, age, interest, headline };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.put("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);
  if (!user) return res.status(404).json({ error: "User not found." });
  const { name, city, age, interest, headline } = req.body;
  if (name) user.name = name;
  if (city) user.city = city;
  if (age) user.age = age;
  if (interest) user.interest = interest;
  if (headline) user.headline = headline;
  res.json(user);
});

app.delete("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return res.status(404).json({ error: "User not found." });
  users.splice(idx, 1);
  res.json({ success: true });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
