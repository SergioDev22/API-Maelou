const db = require("./../service/connect");

module.exports = {
  register: (data) => {
    return new Promise((resolve, reject) => {
      db.query(
        ` 
            INSERT INTO Utilisateur (nom, prenom, cin,
            facebook, adresse, nom_utilisateur, mot_de_passe)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        [
          data.nom,
          data.prenom,
          data.cin,
          data.facebook,
          data.adresse,
          data.nom_utilisateur,
          data.mot_de_passe,
        ],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },

  login: (nom_utilisateur) => {
    return new Promise((resolve, reject) => {
      db.query(
        ` 
          SELECT * FROM Utilisateur WHERE nom_utilisateur = ?
        `,
        [nom_utilisateur],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },
};
