
import express from "express";
import payload from "payload";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";
import multer from "multer";

require("dotenv").config();

const app = express();

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

const connection = process.env.MONGODB_CONNECTION;
const databaseName = process.env.MONGODB_DATABASE;
let database;

MongoClient.connect(connection, (error, client) => {
  if (error) {
    console.error("Kesalahan saat menghubungkan ke MongoDB:", error);
    return;
  }
  database = client.db(databaseName);
  console.log("connect yaww");
});
app.listen(3000, () => {
  console.log("Payload Admin Panel running on port 3000");
});

app.get("/api/todo/GetNotes", (request, response) => {
  database
    .collection("todos")
    .find({})
    .toArray((error, result) => {
      if (error) {
        response.status(500).json({ message: "Internal Server Error" });
        return;
      }
      response.json(result);
    });
});

app.post("/api/todo/AddNotes", multer().none(), (request, response) => {
  const title = request.body.title;
  const category = request.body.category;
  const status = request.body.status;
  const currentTimestamp = new Date();
  const current_date = new Date();

  database.collection("todos").count({}, function (error, index) {
    database.collection("todos").insertOne(
      {
        title: title,
        category: category,
        status: status,
        timestamp_date: current_date.toDateString(),
        timestamp_time: current_date.toLocaleTimeString(),
        createdAt: currentTimestamp,
        updatedAt: currentTimestamp,
      },
      (error, result) => {
        if (error) {
          response.status(500).json({ message: "Internal Server Error" });
          return;
        }
        response.json("sukses bang");
      }
    );
  });
});

app.delete("/api/todo/DeleteNotes", (request, response) => {
  const id = request.query.id as string;

  try {
    const objectId = new ObjectId(id);

    database.collection("todos").deleteOne(
      {
        _id: objectId,
      },
      (error, result) => {
        if (error) {
          response.status(500).json({ message: "Internal Server Error" });
          return;
        }
        response.json("terhapus mang");
      }
    );
  } catch (error) {
    response.status(400).json({ message: "Invalid ID format" });
  }
});

app.patch("/api/todo/UpdateNotes/:id", multer().none(), (request, response) => {
  const noteId = request.params.id;
  const updatedTitle = request.body.title;
  const updatedCategory = request.body.category;
  const updatedStatus = request.body.status;
  const current_date = new Date();

  try {
    const objectId = new ObjectId(noteId);

    const updatedNote = {
      title: updatedTitle,
      category: updatedCategory,
      status: updatedStatus,
      timestamp_date: current_date.toDateString(),
      timestamp_time: current_date.toLocaleTimeString(),
    };

    database
      .collection("todos")
      .updateOne({ _id: objectId }, { $set: updatedNote }, (error, result) => {
        if (error) {
          response.status(500).json({ message: "Internal Server Error" });
          return;
        }
        response.json("Catatan berhasil diperbarui");
      });
  } catch (error) {
    response.status(400).json({ message: "Invalid ID format" });
  }
});
