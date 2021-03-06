const express = require("express");
const app = express();
const cors = require("cors");
const mongoConnect = require("./models/index");
const passport = require("passport");
const helmet = require("helmet");


require("dotenv").config();
require("./config/auth/facebook");
require("./config/auth/google");

const whitelist = [
  "https://shaunjacks.com",
  "https://www.shaunjacks.com",
  "https://blog-shaun.web.app",
  "https://blog-shaun.firebaseapp.com",
  "https://shaunjacks.com/",
  "https://www.shaunjacks.com/",
  "https://blog-shaun.web.app/",
  "https://blog-shaun.firebaseapp.com/"
];

const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  exposedHeaders: ["x-auth-token"]
};
app.use(cors(corsOptions));


const authFacebook = require("./routes/api/auth/facebook");
const authGoogle = require("./routes/api/auth/google");

// Comment routes
const comments = require("./routes/api/comment");

// Email routes
const email = require("./routes/api/email");

// Initialize db connection
const connection = mongoConnect();
connection
  .on("error", console.log)
  .on("disconnected", mongoConnect)
  .once("open", async () => {
    const PORT = process.env.PORT || "3000";
    app.listen(PORT, console.log(`Server started on port ${PORT}`));
  });


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// Add helmet
app.use(helmet());

// Authentication routes
app.use("/api/auth/facebook", authFacebook);
app.use("/api/auth/google", authGoogle);

// Comment routes
app.use("/api/comment", comments);
// Email routes
app.use("/api/email", email);

app.get("/", async (req, res) => {
  return res.status(200).send("Hello!");
});
