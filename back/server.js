import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher";
import cors from "cors";
import config from "./config.js";

//app config
const app = express();
const port = process.env.PORT || 9000;

const secret_url = config.SECRET_KEY;
const pusher = new Pusher({
  appId: "1093567",
  key: "060ed5f036b8eec6d77c",
  secret: secret_url,
  cluster: "us2",
  useTLS: true,
});

//middleware
app.use(express.json());
app.use(cors());

//DB config
const connect_url = config.MONGODB_URL;
mongoose.connect(connect_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// const db = mongoose.connection;

// db.once("open", () => {
//   console.log("mongoose DB connected");

//   const msgCollection = db.collection("messagecontents");
//   const changeStream = msgCollection.watch();
mongoose.connection.once("open", () => {
  console.log("Connected to mongoDB");

  const changeStream = mongoose.connection
    .collection("messagecontents")
    .watch();

  changeStream.on("change", (change) => {
    console.log("Change occured", change);

    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
      });
    } else {
      console.log("error triggering pusher");
    }
  });
});

// api routes
app.get("/", (req, res) => res.status(200).send("whats app mern"));

app.get("/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;
  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.listen(port, () => console.log(`Listening on ${port}`));
