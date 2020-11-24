require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const User = require("./models/User");

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(result =>
    app.listen(process.env.PORT, () =>
      console.log(`DB connected and server started on port ${process.env.PORT}`)
    )
  )
  .catch(err => console.log(err));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("/", (req, res) => {
  User.find({}).then(user => res.json({ user }));
});

app.use("/api/user", authRoutes);
