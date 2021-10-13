require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log(`port started......`);
});

const posts = [
  {
    userName: "charan",
    post: [
      {
        topic: "html",
        content: "content of the website",
      },
    ],
  },
  {
    userName: "charan2",
    post: [
      {
        topic: "css",
        content: "style of the website",
      },
    ],
  },
];

app.get("/posts", authenticate, (req, res) => {
  res.json(posts.filter((post) => post.userName === req.user.name));
});

function authenticate(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  if (token === null) return res.sendStatus(404);
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
