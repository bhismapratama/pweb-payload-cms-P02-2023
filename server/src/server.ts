import express from "express";
import payload from "payload";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";
import multer from "multer";

require("dotenv").config();

const app = express();

// middleware kak
app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.redirect("/admin");
});

payload.init({
  secret: process.env.PAYLOAD_SECRET,
  express: app,
  onInit: async () => {
    payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
  },
});

const PORT = process.env.PORT || 3000;
const MONGODB_CONNECTION = process.env.MONGODB_CONNECTION;
const MONGODB_DATABASE = process.env.MONGODB_DATABASE;
let database;

try {
  MongoClient.connect(MONGODB_CONNECTION, (error, client) => {
    if (error) {
      console.error("salah hubung bang:", error);
      return;
    }
    database = client.db(MONGODB_DATABASE);
    console.log("connect lah masa ngga :D");
  });
} catch (error) {
  console.error("salah hubung bang:", error);
}

app.get("/api/todo/GetNotes", async (request, response) => {
  try {
    const result = await database.collection("todocollection").find({}).toArray();
    response.json(result);
  } catch (error) {
    response.status(500).json({ message: "kebanyakan pikiran jadi error" });
  }
});

app.post("/api/todo/AddNotes", multer().none(), async (request, response) => {
  try {
    const title = request.body.title;
    const category = request.body.category;
    const status = request.body.status;
    const currentTimestamp = new Date();
    const current_date = new Date();

    await database.collection("todocollection").insertOne({
      title: title,
      category: category,
      status: status,
      timestamp_date: current_date.toDateString(),
      timestamp_time: current_date.toLocaleTimeString(),
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
    });

    response.json("pun saestu ditambah");
  } catch (error) {
    response.status(500).json({ message: "kebanyakan pikiran jadi error" });
  }
});

app.patch("/api/todo/UpdateNotes/:id", multer().none(), async (request, response) => {
  try {
    const noteId = request.params.id;
    const updatedTitle = request.body.title;
    const updatedCategory = request.body.category;
    const updatedStatus = request.body.status;
    const current_date = new Date();

    const objectId = new ObjectId(noteId);

    const updatedNote = {
      title: updatedTitle,
      category: updatedCategory,
      status: updatedStatus,
      timestamp_date: current_date.toDateString(),
      timestamp_time: current_date.toLocaleTimeString(),
    };

    const result = await database.collection("todocollection").updateOne({ _id: objectId }, { $set: updatedNote });

    if (result.modifiedCount === 1) {
      response.json("pun update sedoyo");
    } else {
      response.status(404).json({ message: "lho error update" });
    }
  } catch (error) {
    response.status(400).json({ message: "info ID???" });
  }
});

app.delete("/api/todo/DeleteNotes", async (request, response) => {
  try {
    const id = request.query.id as string;
    const objectId = new ObjectId(id);

    const result = await database.collection("todocollection").deleteOne({ _id: objectId });

    if (result.deletedCount === 1) {
      response.json("terhapus mang");
    } else {
      response.status(404).json({ message: "lhoo hapus error" });
    }
  } catch (error) {
    response.status(400).json({ message: "info ID???" });
  }
});

app.listen(PORT, () => {
  console.log(`Payload Admin Panel running on port ${PORT}`);
});
