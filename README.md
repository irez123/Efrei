# API Albums et Photos

Cette API fournit des endpoints pour gérer des albums et des photos. Les utilisateurs peuvent créer, lire, mettre à jour et supprimer des albums et des photos associées à ces albums.

## Fonctionnalités

- Créer, lire, mettre à jour et supprimer des albums.
- Créer, lire, mettre à jour et supprimer des photos associées aux albums.
- Utiliser MongoDB pour le stockage des données.

## Endpoints

### Albums

- **GET** `/albums`  
  Récupérer la liste de tous les albums.

- **GET** `/albums/:id`  
  Récupérer un album par son ID.

- **POST** `/albums`  
  Créer un nouvel album.

- **PUT** `/albums/:id`  
  Mettre à jour un album existant.

- **DELETE** `/albums/:id`  
  Supprimer un album par son ID.

### Photos

- **GET** `/albums/:albumId/photos`  
  Récupérer toutes les photos d'un album spécifique.

- **GET** `/albums/:albumId/photos/:photoId`  
  Récupérer une photo spécifique par son ID.

- **POST** `/albums/:albumId/photos`  
  Ajouter une nouvelle photo à un album.

- **PUT** `/albums/:albumId/photos/:photoId`  
  Mettre à jour une photo existante.

- **DELETE** `/albums/:albumId/photos/:photoId`  
  Supprimer une photo spécifique d'un album.

## Prise en Main

### Prérequis

- Node.js
- MongoDB

### Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/Lalamax/API.git
