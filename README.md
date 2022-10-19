# API-Maelou

Ce sont des APIs pour l'application Maelou

# Installation

- #### Etape 1 :

  Cloner tout d'abord la repository contenant cet API
  `git clone https://github.com/SergioDev22/API-Maelou.git`

- #### Etape 2 :

  Installer alors les dépandances nécessaires
  `yarn install`

- #### Etape 3 :

  Exporter le fichier `database.sql` pour créer la base de données dans votre propre logiciel de gestion de base de données comme `HeidiSQL`

- #### Etape 4 :

  Creer votre propre fichier `.env` à partir du fichier `.env.template` pour la configuration des variables d'environnement nécessaires

- #### Etape 5 :
  Il est le temps de demmarer notre application à l'aide du commande `nodemon server.js`

# Documentations

### Les utilitaires :

Ce sont les routes pour les utils nécessaires afin de faire jouer avec les utilsateurs

<details>
<summary>les types d'alerte</summary>

- <details>
  <summary>Request</summary>

  ```http
  GET <host>:<port>/api/v1/utils/alerte-type
  ```

  </details>

- <details>
    <summary>Response (200)</summary>

  ```json
    [
        {
          "id": <id>,
          "nom": <nom du type d'alerte>,
          "description": <description de ce type>
        },
        {
          "id": <id>,
          "nom": <nom du type d'alerte>,
          "description": <description de ce type>
        },
        {
          "id": <id>,
          "nom": <nom du type d'alerte>,
          "description": <description de ce type>
        }
    ]
  ```

    </details>

  </details>

<br >

### Les utilsateurs

<details>
<summary>Inscription ou Registration</summary>

- <details>
  <summary>Request</summary>

  ```http
  POST <host>:<port>/api/v1/user/register
  {
    "nom": string | required,
    "prenom": string | required,
    "facebook": string | required,
    "cin": string | NOT required,
    "adresse": string | required,
    "nom_utilisateur": string | required,
    "mot_de_passe": string | required,
  }
  ```

  </details>

- <details>
    <summary>Response (200)</summary>

  ```json
    {
        "message": "User registered successfully!",
        "data": {
            "id": <id>,
            "nom": <nom de l'utilisateur> ,
            "prenom": <prénom de l'utilisateur>,
            "adresse": <adresse de l'utilisateur>,
            "token": <token>
        }
    }
  ```

    </details>

  </details>

<details>
<summary>Connexion ou login </summary>

- <details>
  <summary>Request</summary>

  ```http
  POST <host>:<port>/api/v1/user/login
  {
    "nom_utilisateur": string | required,
    "mot_de_passe": string | required,
  }
  ```

  </details>

- <details>
    <summary>Response (200)</summary>

  ```json
    {

        "message": "User logged in successfully!",
        "data": {
            "id": <id>,
            "nom": <nom de l'utilisateur> ,
            "prenom": <prénom de l'utilisateur>,
            "adresse": <adresse de l'utilisateur>,
            "token": <token>
        }
    }
  ```

    </details>

  </details>

<br >

### Alertes

<details>
<summary> Envoyer un alerte </summary>

- <details>
  <summary>Request</summary>
  id_Type : Type d'alerte dans utilitaire

  ```http
  POST <host>:<port>/api/v1/alert/send
  Authorization: Bearer <token>

  {
    "longitude": string | required,
    "latitude": string | required,
    "id_Utilisateur": number | required,
    "id_Type": number | required ,
  }

  ```

  </details>

- <details>
    <summary>Response (200)</summary>

  ```json
    {
      "id": <id de l'alerte dans bdd>,
      "message": "Alert sended succesfuly!"
    }
  ```

    </details>

  </details>
