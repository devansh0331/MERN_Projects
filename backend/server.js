// const express = require('express')
// const app = express()

const express = require("express");
const app = require("express")();
// const server = require("http").createServer(app);
const mongoose = require("mongoose");
const getErrors = require("./routes/errorWorld/getErrors");
const postError = require("./routes/errorWorld/postError");
const singleError = require("./routes/errorWorld/singleError");
const getExpenses = require("./routes/budChi/getExpenses");
const signup = require("./routes/budChi/signup");
const login = require("./routes/budChi/login");
const updateBalance = require("./routes/budChi/updateBalance");
const postExpense = require("./routes/budChi/postExpense");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const profile = require("./routes/budChi/profile");
const logout = require("./routes/budChi/logout");

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use(cookieParser());

require("dotenv").config();

app.use(express.json());

// PORT Number
const portNumber = parseInt(process.env.PORT || 8080);

app.get("/", (req, res) => res.send("Server is working fine"));

// MongoDB URL
const mongoURL = process.env.MONGO_URL;

// Connecting with MongoDB
mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));
//   var db = mongoose.connection;

// REQUESTS

// Error World
app.get("/errors", getErrors);
app.post("/post-error", postError);
app.get("/error/:id", singleError);

// BudChi
app.get("/expenses/:id", getExpenses);
app.post("/signup", signup);
app.post("/login", login);
app.post("/post-expense", postExpense);
app.post("/update-balance", updateBalance);
app.get("/profile", profile);
app.post("/logout", logout);

// LISTEN
app.listen(portNumber, () =>
  console.log(`Server is running at port ${portNumber}...`)
);
