import http from "http";
import url from "url";
import { users } from "./db.js";


const sendCORS = (res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { pathname, query } = parsedUrl;

  if (req.method === "OPTIONS") {
    sendCORS(res);
    res.writeHead(204);
    res.end();
    return;
  }

  if (pathname === "/api" || pathname === "/api/users") {
    sendCORS(res);
    res.setHeader("Content-Type", "application/json");

    let filtered = users;

    if (query.name) {
      filtered = filtered.filter((u) =>
        u.name.toLowerCase().includes(query.name.toLowerCase())
      );
    }
    if (query.city) {
      filtered = filtered.filter(
        (u) => u.city.toLowerCase() === query.city.toLowerCase()
      );
    }
    if (query.age) {
      filtered = filtered.filter((u) => u.age == query.age);
    }
    if (query.interest) {
      filtered = filtered.filter((u) =>
        u.interests.includes(query.interest.toLowerCase())
      );
    }

    res.writeHead(200);
    res.end(JSON.stringify(filtered));
    return;
  }

  if (pathname === "/" && req.method === "GET") {
    sendCORS(res);
    res.setHeader("Content-Type", "text/html");
    import("fs").then((fs) => {
      fs.readFile("index.html", (err, data) => {
        if (err) {
          res.writeHead(500);
          res.end("Error loading index.html");
        } else {
          res.writeHead(200);
          res.end(data);
        }
      });
    });
    return;
  }

  sendCORS(res);
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not found" }));
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
