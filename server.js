import express from "express";
import pool from "./db/index.js";
import cors from "cors";

const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());




app.get("/", async (req, res) => {
  try {
    const query = "SELECT * FROM weather";
    const { rows: city } = await pool.query(query);
    res.json(city);
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM weather WHERE id = $1";
    const { rows: city } = await pool.query(query, [id]);
    res.json(city);
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Your app listening on http://localhost:${port}`);
});


