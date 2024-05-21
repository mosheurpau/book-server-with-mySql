import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "furniture_management",
});
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("hello this is the backend");
});

app.get("/furniture", (req, res) => {
  const q = "SELECT * FROM furniture_management.furniture";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/furniture", (req, res) => {
  // Check if required data exists
  if (!req.body.title || !req.body.desc || !req.body.cover || !req.body.price) {
    return res
      .status(400)
      .json({ message: "Missing required fields in request body" });
  }

  const q =
    "INSERT INTO furniture (`title`, `desc`, `cover`, `price`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.cover,
    req.body.price,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Furniture has been created successfully");
  });
});

app.delete("/furniture/:id", (req, res) => {
  const furnitureId = req.params.id;
  const q = "DELETE FROM furniture WHERE id = ?";

  db.query(q, [furnitureId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Furniture has deleted successfully.");
  });
});

app.put("/furniture/:id", (req, res) => {
  const furnitureId = req.params.id;
  const q =
    "UPDATEfurniture SET `title`= ?, `desc`= ?, `cover`=?, `price`= ? WHERE id = ?";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.cover,
    req.body.price,
  ];
  db.query(q, [...values, furnitureId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Furniture has been Updated successfully.");
  });
});

app.listen(8800, () => {
  console.log("Connected to backend!");
});
