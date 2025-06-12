import express from "express";
import db from "./db.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
db.connect();

app.use(express.json());
app.use(cors());

// Serve frontend from client/dist
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientPath = path.join(__dirname, "../client/dist");
app.use(express.static(clientPath));

//GET ROUTE FOR ALL TO DO'S
app.get("/", async (req, res) => {
  try {
    const fullList = await db.query("SELECT * FROM todo ORDER BY id ASC");
    res.json(fullList.rows);
  } catch (error) {
    console.log(error);
  }
});

// GET ROUTE FOR A SINGLE TODO
app.get("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const singleTodo = await db.query("SELECT * FROM todo WHERE id=$1", [id]);
    res.json(singleTodo.rows);
  } catch (error) {
    console.log(error);
  }
});

//PUT ROUTE FOR UPDATE TODO ITEMS
app.put("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const update = await db.query(
      "UPDATE todo SET description=$1 WHERE id=$2",
      [description, id]
    );
    res.json(update.rows);
  } catch (error) {
    console.log(error);
  }
});

//POST ROUTE
app.post("/todo", async (req, res) => {
  try {
    console.log("Incoming request body:", req.body);
    const { description } = req.body;
    const newTodo = await db.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows);
  } catch (err) {
    console.log(err);
  }
});

// Fallback route to serve index.html for any unmatched routes
app.get("/*", function (req, res) {
  res.sendFile(path.resolve(clientPath, "index.html"));
});

app.listen(port, () => {
  console.log(`Server is listing on port ${port}.`);
});

//DELETE ROUTE
app.delete("/todo/:id/", async (req, res) => {
  try {
    const { id } = req.params;
    const del = await db.query("DELETE FROM todo WHERE id=$1", [id]);
    res.json("deleted:", del);
  } catch (error) {
    console.log(error);
  }
});
