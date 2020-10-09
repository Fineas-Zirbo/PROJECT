const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const jsonwebtoken = require("jsonwebtoken");
//const cookieParser = require("cookie-parser");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup
  );
  //app.use(bodyParser.json());
  //const jwtSecret = "643adasdaas";

  app.post("/api/auth/signin", controller.signin);
  //const token = jsonwebtoken.sign({ user: "user" }, jwtSecret);
  //res.cookie("token", token, { httpOnly: true });
  //res.json({ token });
};
