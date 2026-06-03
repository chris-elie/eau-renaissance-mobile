import express from "express";
import cors from "cors";
import { db } from "./db.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// ✅ Route d’accueil
app.get("/", (req, res) => {
  res.send("Bienvenue sur l’API Express + MySQL !");
});

// ✅ Exemple : récupérer tous les utilisateurs
app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

// ✅ Exemple : ajouter un utilisateur
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
  db.query(sql, [name, email], (err, result) => {
    if (err) return res.status(500).json(err);
    return res.json({ message: "Utilisateur ajouté avec succès !" });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur en ligne sur le port ${PORT}`));
