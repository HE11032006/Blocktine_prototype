# Blocktine - Prototype de Tontine Decentralisee

## Description de la solution
Blocktine est une application web de gestion de tontines collectives. Elle a pour but de moderniser et de securiser la tradition de l'epargne communautaire en Afrique, plus precisement au Benin. Le systeme simule l'utilisation de la technologie blockchain (Polygon) au travers de smart contracts pour garantir la transparence des transactions, la securite des fonds, et automatiser les cycles de cotisation et de deblocage. Le design respecte les codes esthetiques premium de "l'Atelier Benin" pour une experience utilisateur optimale et engageante.

## Fonctionnalites principales developpees
- Creation de compte et authentification.
- Tableau de bord personnalise selon le role (Organisateur ou Participant).
- Creation de tontines avec parametres avances (capacite, montant de contribution, frequence des cycles, visibilite publique ou privee).
- Systeme de partage d'invitation par code secret pour rejoindre les tontines privees.
- Exploration et integration rapide de tontines publiques ouvertes.
- Gestion des membres au sein d'une tontine (attribution de rangs de reception, validation des paiements).
- Simulation de paiements et avancement visuel de la progression des cycles.
- Systeme d'administration et de sanctions : possibilite d'appliquer des avertissements, des penalites financieres ou l'exclusion pour retard de paiement (simule par les regles de smart contracts).

## Technologies utilisees
- Frontend : React.js, TypeScript
- Framework & Routage : TanStack Start, TanStack Router
- Outil de build et Bundler : Vite
- Style & Interface Visuelle : TailwindCSS, composants Radix UI
- Stockage de donnees : LocalStorage (pour simuler la base de donnees et le backend dans le cadre du prototype)
- Deploiement : Vercel

## Instructions d'installation et d'utilisation

### Prerequis
Avant de commencer, assurez vous d'avoir les outils suivants installes sur votre machine :
- Node.js (Version 18 ou superieure recommandee)
- npm (installe automatiquement avec Node.js)

Comment obtenir Node.js et npm si vous ne les avez pas :
1. Rendez-vous sur le site officiel : https://nodejs.org/
2. Telechargez et installez la version "LTS" (recommandee pour plus de stabilite).
3. Verifiez l'installation en tapant `node -v` et `npm -v` dans votre invite de commande ou terminal.

### Installation
Une fois les prerequis prets, suivez ces etapes :
1. Ouvrez un terminal dans le dossier racine du projet (le dossier ou se trouve ce fichier README).
2. Lancez la commande suivante pour telecharger et installer toutes les dependances du projet :
   ```bash
   npm install
   ```

### Lancement du projet en local
Pour demarrer l'application sur votre ordinateur en mode developpement :
1. Dans votre terminal, lancez la commande :
   ```bash
   npm run dev
   ```
2. Apres un court instant, un lien de developpement s'affichera dans le terminal (generalement http://localhost:5173).
3. Cliquez sur ce lien ou copiez-le dans la barre d'adresse de votre navigateur web pour commencer a utiliser l'application.

Note : Assurez-vous qu'aucun autre service n'utilise deja le port 5173 sur votre ordinateur, sinon le demarrage pourrait echouer.
