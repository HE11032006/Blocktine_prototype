# TontineChain — Application interactive (frontend)

Application web mono-page entièrement interactive (mock, sans backend) pour la plateforme de tontine décentralisée, dans l'univers visuel exact du site vitrine fourni.

## Identité visuelle (extraite du site vitrine)

**Palette** — fond noir profond `#080C08`, vert béninois `#1B5E20`, or vif `#FFD400`, rouge `#B71C1C`, blanc cassé `#FAF9F4`. Mode clair miroir avec fond `#FAF9F4` + accents or/vert.

**Typographie**
- `Bebas Neue` pour titres (très large, letter-spacing serré)
- `Playfair Display` italic pour les "fon-block" (citations dorées encadrées)
- `DM Sans` pour le corps de texte

**Signatures visuelles à reprendre**
- Texture grain SVG en overlay
- Diviseur "kita" (bandes répétées vert/or/rouge) entre sections
- Badges arrondis or pâle (`◆ texte`)
- Boutons pill : primaire or sur noir, secondaire outline blanc
- Cartes à fond noir avec bordure or 0.5px, hover → fond vert sombre + barre or à gauche
- Filigrane cauri / anneaux décoratifs concentriques en arrière-plan
- Stats géantes en Bebas Neue or avec glow

## Structure des pages (navigation SPA par état)

```text
Landing  ─►  Signup / Login  ─►  Dashboard  ─┬─►  Créer tontine  ─► Dashboard (toast)
                                              ├─►  Rejoindre      ─► Modal ─► Dashboard
                                              ├─►  Détail tontine (Créateur | Membre)
                                              └─►  Settings
```

Header fixe minimal (logo TontineChain, lien retour Dashboard, avatar) présent dès que l'utilisateur est "connecté".

### 1. Landing
Hero plein écran noir, badge `◆ Épargne collective Web3`, titre Bebas géant avec mot-clé en or, fon-block italique doré, deux boutons pill ("Commencer" / "Se connecter"), 3 stats en bas. Anneaux décoratifs + filigrane cauri à droite.

### 2. Signup / Login
Carte centrale sur fond noir grainé, bordure or fine, formulaire minimal (nom, email, mot de passe — signup ajoute confirmation). Bouton submit or → Dashboard. Lien bascule vers l'autre formulaire.

### 3. Dashboard
- Carte profil : avatar généré (initiales sur disque or), nom, adresse wallet mock `0x7a3f…b21`, badge "Polygon"
- 3 cartes overview : Tontines actives / Prochain paiement / Total épargné (gros chiffres Bebas or)
- 2 boutons d'action principaux ("Créer une tontine" / "Rejoindre une tontine")
- Liste compacte des tontines de l'utilisateur (cliquable → Détail)

### 4. Créer une tontine
Formulaire en carte : nom, nombre de membres (slider/select), montant en MATIC, cycle (toggle hebdo/mensuel). Submit → retour Dashboard avec toast or "Tontine créée ✦".

### 5. Rejoindre une tontine
Grille de 4–5 cartes mock (style prob-card-item : bordure or, hover vert sombre + barre or). Chaque carte montre nom, membres (3/8), montant MATIC, fréquence, bouton "Rejoindre". Clic → modal de confirmation centrée → Dashboard + toast.

### 6. Détail tontine — deux vues onglets
**Vue Créateur** : liste membres avec statut (à jour / en retard / payé), tracker de contributions (barres dorées), historique transactions mock (hash tronqué + montant + date), badge "✦ Transactions sécurisées via smart contracts Polygon".
**Vue Membre** : calendrier de paiements, ma prochaine échéance (carte mise en avant), barre de progression du groupe.

### 7. Settings
Toggle thème clair/sombre (persisté localStorage), toggles notifications (paiement à venir, nouveau membre, fin de cycle), section infos compte en lecture seule.

## Détails techniques

- TanStack Start avec routes séparées : `/`, `/auth`, `/dashboard`, `/dashboard/create`, `/dashboard/join`, `/dashboard/tontine/$id`, `/dashboard/settings` (chaque route a son `head()` propre)
- État global léger via React context (utilisateur mock, liste tontines, thème)
- Données mock dans `src/lib/mock-data.ts`
- Tokens couleur ajoutés dans `src/styles.css` (oklch) en plus des tokens shadcn existants
- Polices Google Fonts ajoutées dans `<head>` du root
- Composants UI shadcn réutilisés (Button, Card, Dialog, Switch, Input, Tabs, Toast/Sonner)
- Toast via `sonner` déjà disponible
- Animations légères (fadeUp, glow) via classes Tailwind + keyframes custom
- Aucun backend, aucun appel API, aucune vraie blockchain — uniquement UI