const http = require("http");
const url = require("url");
const host = 'localhost';
const port = 8000;

const fs = require("fs");
const path = require("path");

const publicPath = "../public/";

// Fungsi yang berjalan ketika ada request yang masuk.
function onRequest(req, res) {
  console.log(`${req.method} ${req.url}`);

  let reqUrl = req.url;

  switch (reqUrl) {
    case "/":
      reqUrl = "index.html";
      break;
    case "/cars":
      reqUrl = "./search-car.html";
      break;
    default:
      reqUrl = req.url;
      break;
  }

  // parse URL
  const parsedUrl = url.parse(reqUrl);
  // extract URL path
  let filename = `${parsedUrl.pathname}`;
  let pathname = path.join(__dirname, publicPath, filename);
  console.log(pathname);
  // extract file extention
  const ext = path.parse(pathname).ext;
  // list maps file extension
  const map = {
    ".ico": "image/x-icon",
    ".html": "text/html",
    ".js": "text/javascript",
    ".json": "application/json",
    ".css": "text/css",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".wav": "audio/wav",
    ".mp3": "audio/mpeg",
    ".svg": "image/svg+xml",
    ".pdf": "application/pdf",
    ".doc": "application/msword",
  };

  fs.exists(pathname, function (exist) {
    if (!exist) {
      // jika ada file yang tidak ditemukan, return 404
      res.statusCode = 404;
      res.end(`File ${pathname} not found!`);
      return;
    }

    // jika direktori pencarian menemukan file extension yang sama
    if (fs.statSync(pathname).isDirectory()) pathname += "/index" + ext;

    // membaca file dari sistem
    fs.readFile(pathname, function (err, data) {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        // jika file telah ditemukan, kirimkan data
        res.setHeader("Content-type", map[ext] || "text/plain");
        res.end(data);
      }
    });
  });
}

const server = http.createServer(onRequest);

// Jalankan server
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
