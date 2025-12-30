FROM node:21.7

# Définit le dossier de travail interne
WORKDIR /home/node/app

# Copie d'abord les fichiers de dépendances pour optimiser le cache Docker
COPY package*.json ./

# Installe les dépendances (référence Lab 4)
RUN npm install

# Copie le reste du code source (server.js, dossier public, etc.)
COPY . .

# Expose le port 3000 utilisé par ton server.js
EXPOSE 3000

# Définit l'utilisateur non-root pour la sécurité (référence Lab 4)
USER node

# Commande de lancement
CMD ["node", "server.js"]