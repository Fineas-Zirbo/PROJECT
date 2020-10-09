const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(cookieParser());

// app.use(
//   jwt({
//     secret: "secret123",
//     getToken: (req) => req.cookies.token,
//   })
// );

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;

db.sequelize.sync({});
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

// app.get("/jwt", (req, res) => {
//   const token = jsonwebtoken.sign({ user: "johndoe" }, jwtSecret);
//   res.cookie("token", token, { httpOnly: true });
//   res.json({ token });
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}
