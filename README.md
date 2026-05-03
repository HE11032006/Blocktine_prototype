# Blocktine - Prototype de Tontine Decentralisee

## Presentation du projet
Blocktine est une application de gestion de tontines collectives, concue pour moderniser la tradition de l'epargne communautaire beninoise. Le projet utilise la technologie blockchain (Polygon) via des smart contracts pour garantir la transparence, la securite des fonds et l'automatisation des cycles de paiement. L'interface respecte les codes esthetiques de l'Atelier Benin pour offrir une experience premium et artisanale.

## Prerequis
Avant de commencer, assurez-vous d'avoir les outils suivants installes sur votre machine :
- Node.js (Version 18 ou superieure recommandee)
- npm (installe automatiquement avec Node.js)

### Comment obtenir Node.js et npm
Si vous ne les avez pas encore :
1. Rendez-vous sur le site officiel : https://nodejs.org/
2. Telechargez et installez la version "LTS" (recommandee pour la stabilite).
3. Verifiez l'installation en tapant `node -v` et `npm -v` dans votre terminal.

## Installation
Une fois les prerequis installes, suivez ces etapes :

1. Ouvrez un terminal dans le dossier racine du projet (la ou se trouve ce fichier README).
2. Executez la commande suivante pour installer toutes les dependances necessaires :
   ```bash
   npm install
   ```

## Lancer le projet
Pour demarrer l'application en mode developpement :

1. Dans votre terminal, executez la commande :
   ```bash
   npm run dev
   ```
2. Apres quelques secondes, un lien s'affichera dans le terminal (generalement http://localhost:5173 ou http://localhost:3000).
3. Cliquez sur ce lien ou copiez-le dans votre navigateur pour acceder a l'application.

Note : Assurez-vous qu'aucun autre service n'utilise deja ce port sur votre machine, sinon vous aurez des problèmes. pour verifier les ports ouverts sur votre machine, vous pouvez utiliser la commande `netstat -ano | findstr :<port>` sur windows et `lsof -ti: <port> | xargs kill -9` sur linux.
