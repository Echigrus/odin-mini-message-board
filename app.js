const express = require("express");
const app = express();
const path = require("node:path");
const assetsPath = path.join(__dirname, "public");

app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const links = [
  { href: "/", text: "Home" },
  { href: "/new", text: "New message" },
  { href: "about", text: "About" },
];
const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

app.get("/", (req, res) =>
  res.render("index", { links: links, messages: messages })
);
app.get("/new", (req, res) => res.render("new", { links: links }));
app.get("/about", (req, res) => res.render("about", { links: links }));

app.post("/new", (req, res) => {
  messages.push({
    text: req.body.text,
    user: req.body.user,
    added: new Date(),
  });
  res.redirect("/");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
  // This is important!
  // Without this, any startup errors will silently fail
  // instead of giving you a helpful error message.
  if (error) {
    throw error;
  }
  console.log(`My first Express app - listening on port ${PORT}!`);
});
