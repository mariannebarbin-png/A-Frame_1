const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

http.createServer((req, res) => {
  console.log("Request for " + req.url);

  let filePath = "." + req.url;

  // Serve starter-file.html when visiting root ("/")
  if (req.url === "/" || req.url === "") {
    filePath = "./starter-file.html";
  }

  // Fix path for Windows
  filePath = path.normalize(filePath);

  // Determine correct content type
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".glb": "model/gltf-binary",
  };

  const contentType = mimeTypes[ext] || "application/octet-stream";

  fs.readFile(filePath, (err, content) => {
    if (err) {
      console.log("⚠️ File not found:", filePath);
      res.writeHead(404);
      res.end("404 Not Found: " + filePath);
      return;
    }

    res.writeHead(200, { "Content-Type": contentType });
    res.end(content);
  });

}).listen(PORT);

console.log(`🚀 Server running at http://localhost:${PORT}`);
