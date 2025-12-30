const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Middleware pour lire le JSON et servir tes fichiers statiques (index.html)
app.use(express.json());
app.use(express.static('public'));

// 1. CONFIGURATION DE LA CONNEXION MONGODB
// L'URL "mongodb-service" correspond au nom que tu as mis dans ton fichier mongo-service.yaml
const mongoURI = process.env.MONGO_URI || 'mongodb://mongodb-service:27017/nolan_db';

mongoose.connect(mongoURI)
    .then(() => console.log("✅ Connecté avec succès à MongoDB dans le cluster !"))
    .catch(err => console.error("❌ Erreur de connexion MongoDB :", err));

// 2. MODÈLE DE DONNÉES (Adapté à ton index.html)
// Même si c'est un fan club, on garde les clés "film" et "note" pour que ton fetch() fonctionne
const avisSchema = new mongoose.Schema({
    film: { type: String, required: true }, // Correspond à ton filmInput (l'exploit de Nolan)
    note: { type: Number, required: true }, // Correspond à ton noteInput (/5)
    date: { type: Date, default: Date.now }
});

const Avis = mongoose.model('Avis', avisSchema);

// 3. ROUTES API

// GET : Récupérer tous les messages pour les afficher dans "Messages du Livre d'Or"
app.get('/api/avis', async (req, res) => {
    try {
        const messages = await Avis.find().sort({ date: -1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: "Impossible de récupérer les messages" });
    }
});

// POST : Enregistrer un nouveau message de soutien
app.post('/api/avis', async (req, res) => {
    try {
        const nouvelAvis = new Avis({
            film: req.body.film,
            note: req.body.note
        });
        await nouvelAvis.save();
        res.status(201).json(nouvelAvis);
    } catch (err) {
        res.status(400).json({ error: "Erreur lors de l'enregistrement du message" });
    }
});

// Lancement du serveur sur le port 3000 (celui exposé dans ton Dockerfile et ton Service K8s)
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur du Fan Club lancé sur http://localhost:${PORT}`);
});