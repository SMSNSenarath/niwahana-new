const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const pdf = require("html-pdf");
const cors = require("cors");
const Nexmo = require("nexmo");
const socketio = require("socket.io");

const workers = require("./routes/workers");
const hirers = require("./routes/hirers");
const works = require("./routes/works");
const admin = require("./routes/admin");
const stats = require("./routes/stats");

const pdfTemplate = require("./documents");
const { response } = require("express");

const app = express();

app.use("/admin", admin);

app.use(cors());
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
require("./config/password2")(passport);

//making Uploads folder public
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/workers", workers);
app.use("/hirers", hirers);
app.use("/works", works);
app.use("/stats", stats);

//POST - Pdf generation and fetching data//
app.post("/create-pdf", (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile("result.pdf", (err) => {
    if (err) {
      res.send(Promise.reject());
    }
    res.send(Promise.resolve());
  });
});
//GET - Send genrated pdf to client
app.get("/fetch-pdf", (req, res) => {
  res.sendFile(`${__dirname}/result.pdf`);
});

//Init Nexmo
const nexmo = new Nexmo(
  {
    apiKey: "181d7d6a",
    apiSecret: "YPxgV6pT3zKfjcyc",
  },
  { debug: true }
);

//POST - Purchase
app.post("/purchase/:id", (req, res) => {
  // res.send(req.body);
  // console.log(req.body);
  const phoneNo = req.body.phoneNo;
  const message = req.body.message;
  nexmo.message.sendSms(
    "Niwahana",
    phoneNo,
    message,
    { type: "unicode" },
    (err, responseData) => {
      if (err) {
        console.log(err);
      } else {
        console.dir(responseData);
        //Get Data from response
        const data = {
          id: responseData.messages[0]["message-id"],
          number: responseData.messages[0]["to"],
        };

        //Emit to the client
        io.emit("smsStatus", data);
      }
    }
  );
});

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
const server = app.listen(port, () =>
  console.log(`Server up and running on port ${port} !`)
);

//Connect to socket.io

const io = socketio(server);

io.on("connection", (socket) => {
  console.log("Connected!");
  io.on("disconnect", () => {
    console.log("Disconnected!");
  });
});
