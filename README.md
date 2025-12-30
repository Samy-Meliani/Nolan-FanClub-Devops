# 🚀 Nolan Fan Club - Projet Final DevOps

Ce projet est une application web interactive ("Fan Club de Nolan Toussaint") qui démontre une maîtrise complète de la chaîne DevOps, du développement local au déploiement orchestré dans un cluster Kubernetes avec un pipeline CI/CD automatisé.

## 🏗️ Architecture du Projet

L'application repose sur une architecture microservices conteneurisée :
* **Frontend/Backend** : Node.js & Express (3 réplicas pour la haute disponibilité).
* **Base de données** : MongoDB (utilisant une image stable `4.4-bionic` pour assurer la compatibilité).
* **Orchestration** : Kubernetes (Pods, Services, Deployments).

## 🛠️ Pipeline CI/CD (GitHub Actions)

Le projet utilise **GitHub Actions** pour automatiser le cycle de vie de l'application :
1. **Build** : À chaque `push` sur la branche `main`, GitHub construit une nouvelle image Docker.
2. **Push** : L'image est envoyée automatiquement sur **Docker Hub** (`pasnassim/nolan-app:latest`).
3. **Deploy** : Le cluster Kubernetes télécharge la version officielle depuis le Cloud grâce à la règle `imagePullPolicy: Always`.

## 🚀 Installation et Déploiement

### 1. Prérequis
* Docker Desktop avec Kubernetes activé.
* Un compte Docker Hub pour le stockage des images.

### 2. Lancement de l'infrastructure
Appliquer les configurations dans l'ordre suivant pour assurer la connectivité :

```bash
# Lancer la base de données
kubectl apply -f k8s/mongodb.yaml

# Attendre que MongoDB soit "Running", puis lancer l'application
kubectl apply -f k8s/nolan-app.yaml