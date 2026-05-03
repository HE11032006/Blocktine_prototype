# Prototype blockTine

Bienvenue sur le prototype haute fidelite de l'application blockTine. Ce document explique la structure actuelle du projet et les differentes fonctionnalites implementees pour notre groupe de travail.

## Architecture et Pipeline

Le projet est construit avec une architecture front-end moderne basee sur React et Vite. Il s'agit d'une application de type Single Page Application (SPA).

- Framework : React 19 avec TypeScript
- Routage : TanStack Router pour une navigation fluide sans rechargement
- Design : CSS natif avec un systeme de conception premium
- Persistance : Les donnees utilisateur sont simulees et partiellement stockees dans le navigateur (localStorage)

## Fonctionalites integrees

Le prototype met en evidence le flux utilisateur sans necessiter un backend complexe pour le moment :

1. Authentification : Connexion et inscription simulees. Le statut de l'utilisateur est conserve dans la session locale.
2. Creation de tontines : Possibilite de creer des cercles publics ou prives. Les cercles prives peuvent avoir un nombre de membres illimite. Le createur definit la date de debut.
3. Ralliement aux tontines :
   - Par code d'invitation pour les tontines privees.
   - Par selection directe dans la liste pour les tontines publiques.
4. Acceptation des regles Polygon : Les utilisateurs doivent accepter la politique stricte du Smart Contract avant de rejoindre (perte de fonds en cas d'abandon).
5. Choix de rang : Selection de l'ordre de passage en fonction des places encore disponibles.
6. Tableau de bord : Suivi des contributions et de la progression des membres.
7. Simulation de Smart Contract : Le prototype permet de simuler le non-respect des regles par un membre. Le statut evolue de "En retard" vers "Penalite 5%" puis "Banni" a chaque avertissment.
8. Quitter une tontine : Un membre peut decider de quitter le cercle, ce qui declenche une alerte sur les consequences liees au Smart Contract.

## Instructions pour l'execution locale

Pour lancer ce projet sur vos machines respectives :

1. Installez les dependances :
npm install

2. Lancez le serveur de developpement :
npm run dev

3. Ouvrez votre navigateur sur l'adresse locale indiquee par le terminal.
