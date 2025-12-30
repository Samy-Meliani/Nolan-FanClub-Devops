const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static('public'));

const mongoURI = process.env.MONGO_URI || 'mongodb://mongodb-service:27017/nolan_db';

mongoose.connect(mongoURI)
    .then(() => console.log("✅ Connecté avec succès à MongoDB dans le cluster !"))
    .catch(err => console.error("❌ Erreur de connexion MongoDB :", err));


const avisSchema = new mongoose.Schema({
    film: { type: String, required: true },
    note: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

const Avis = mongoose.model('Avis', avisSchema);

// 3. ROUTES API

app.get('/api/avis', async (req, res) => {
    try {
        const messages = await Avis.find().sort({ date: -1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: "Impossible de récupérer les messages" });
    }
});

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