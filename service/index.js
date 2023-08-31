const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = 4040;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

let posts = fs.readFileSync(path.resolve(__dirname, 'data.json'), 'utf-8');
posts = JSON.parse(posts);

app.get('/api', (req, res) => {
  return res.status(200).json({ data: 'hello world' })
});

app.get('/api/posts', (req, res) => {
  return res.status(200).json({
    posts,
  });
});





app.listen(PORT, () =>
  console.log(`server running in http://localhost:${PORT}`)
);