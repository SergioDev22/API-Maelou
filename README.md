# API-Maelou

Ce sont des APIs pour l'application Maelou

## INSTALLATION

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

## DOCUMENTATIONS

## Les utilitaires :

Ce sont les routes pour les utils nécessaires afin de faire jouer avec les utilsateurs

<details>
<summary>les types d'Alerte</summary>

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

<details>
<summary>les types de Status</summary>

- <details>
  <summary>Request</summary>

  ```http
  GET <host>:<port>/api/v1/utils/status-type
  ```

  </details>

- <details>
    <summary>Response (200)</summary>

  ```json
  [
    {
      "id": 1,
      "nom": "NOUVEAU"
    },
    {
      "id": 2,
      "nom": "PRISE"
    },
    {
      "id": 3,
      "nom": "EN PROGRES"
    },
    {
      "id": 4,
      "nom": "EN ATTENTE"
    }
  ]
  ```

    </details>

  </details>

<br >

## Les services des utilisateurs simples

#### Registration et login

<details>
<summary>Inscription ou Registration</summary>

- <details>
  <summary>Request</summary>

  **NB** : Pour prendre en compte le PDC de l'utilsateur,
  Il faut envoyer les données en `multipart/form-data`
  avec le champ de la photo nommé "pdc"

  ```http
  POST <host>:<port>/api/v1/user/register
  formdata(
    "nom": string | required,
    "prenom": string | required,
    "facebook": string | required,
    "cin": string | NOT required,
    "adresse": string | required,
    "nom_utilisateur": string | required,
    "mot_de_passe": string | required,
    "pdc": file | NOT required,
  )
  ```

  Sinon, Envoyer tout simplement les données en `json`

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

#### Alertes

<details>
<summary> Envoyer un alerte </summary>

- <details>
  <summary>Request</summary>
  
  *id_Type* : Type d'alerte dans utilitaire

  ```http
  POST <host>:<port>/api/v1/alert
  Authorization: Bearer <token>

  {
    "longitude": string | required,
    "latitude": string | required,
    "id_Utilisateur": number | required
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

## Les services des ADMIN

#### Registration et login

<details>
<summary>Inscription ou Registration</summary>

- <details>
  <summary>Request</summary>

  **NB : Cet action a besoin d'un pouvoir super Admin(isSuper===true)**

  ```http
  POST <host>:<port>/api/v1/admin/register
  {
    "nom": string | required,
    "prenom": string | required,
    "grade": string | required,
    "poste": string | required,
    "nom_utilisateur": string | required,
    "mot_de_passe": string | required,
    "isSuper": boolean | NOT required,

  }
  ```

  </details>

- <details>
    <summary>Response (200)</summary>

  ```json
    {
      "message": "Admin registered successfully!",
      "id": <id>,
      "data": {
        "nom": <nom>,
        "prenom": <prénom>,
        "grade": <grade>,
        "poste": <poste>,
        "nom_utilisateur": <nom_utilisateur>,
        "isSuper": false
      },
      "token": <token>
    }
  ```

    </details>

  </details>

<details>
<summary>Connexion ou login </summary>

- <details>
  <summary>Request</summary>

  ```http
  POST <host>:<port>/api/v1/admin/login
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
      "message": "Admin registered successfully!",
      "id": <id>,
      "data": {
        "nom": <nom>,
        "prenom": <prénom>,
        "grade": <grade>,
        "poste": <poste>,
        "nom_utilisateur": <nom_utilisateur>,
        "isSuper": false
      },
      "token": <token>
    }
  ```

    </details>

  </details>

#### Alertes

<details>
<summary> Geter les alertes et leurs historiques  non términées </summary>

- <details>
  <summary>Request</summary>

  ```http
  GET <host>:<port>/api/v1/alert
  Authorization: Bearer <token_admin>
  ```

  </details>

- <details>
    <summary>Response (200)</summary>

  ```json
    [
      {
        "id":<id_Alert> ,
        "people": {
          "id": <id_de_la_personne_sender>,
          "nom": <son_nom>,
          "prenom": <son_prenom>,
          "cin": <son_cin>,
          "facebook": <son_pseudo_fb>,
          "adresse": <son_adresse>
        },
        "content": {
          "date_post": <date_post_d_alerte>,
          "longitude": <son_longitude>,
          "latitude": <son_latitude>
        },
        "type_Alert": {
          "id": <id_type_alerte>,
          "nom": <son_nom>
        },
        "status_Alert": {
          "id": <id_status_alerte>,
           "nom": <son_nom>
        }
      },
      {
        "id":<id_Alert> ,
        "people": {
          "id": <id_de_la_personne_sender>,
          "nom": <son_nom>,
          "prenom": <son_prenom>,
          "cin": <son_cin>,
          "facebook": <son_pseudo_fb>,
          "adresse": <son_adresse>
        },
        "content": {
          "date_post": <date_post_d_alerte>,
          "longitude": <son_longitude>,
          "latitude": <son_latitude>
        },
        "type_Alert": {
          "id": <id_type_alerte>,
          "nom": <son_nom>
        },
        "status_Alert": {
          "id": <id_status_alerte>,
           "nom": <son_nom>
        }
      }
    ]
  ```

    </details>

  </details>

<details>
<summary> Changer le status d'alerte </summary>

- <details>
  Cet API permet de changer le status d'Alerte
  **NB** : les types de status sont vu aux utilitaires
  <summary>Request</summary>

  ```http
  PATCH <host>:<port>/api/v1/alert/<id_Alerte>
  Authorization: Bearer <token_admin>

  {
    "id_Admin" : <id_Admin>,
    "id_Status": <id_Status_pour_le_changement>
  }
  ```

  </details>

- <details>
    <summary>Response (200)</summary>

  ```json
  {
    "message": "Alert status changed succesfuly for   Alert <id_Alerte>"
  }
  ```

    </details>

  </details>

<details>
<summary> Marquer l'alerte comme Términé, c'est-a-dire PROBLEME RESOLU </summary>

- <details>
  <summary>Request</summary>

  ```http
  PATCH <host>:<port>/api/v1/alert/close/<id_Alerte>
  Authorization: Bearer <token_admin>

  {
    "id_Admin" : <id_Admin>
  }
  ```

  </details>

- <details>
    <summary>Response (200)</summary>

  ```json
  {
    "message": "Alert status changed \"TERMINE\" succesfuly for Alert <id_Alerte>"
  }
  ```

    </details>

  </details>
