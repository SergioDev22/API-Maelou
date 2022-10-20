const db = require("./../service/connect");

module.exports = {
  register: (data) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
            INSERT INTO Admin (nom, prenom, grade, poste, nom_utilisateur, mot_de_passe,isSuper)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        [
          data.nom,
          data.prenom,
          data.grade,
          data.poste,
          data.nom_utilisateur,
          data.mot_de_passe,
          data.isSuper,
        ],
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  login: (data) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
            SELECT * FROM Admin WHERE nom_utilisateur = ?
        `,
        [data.nom_utilisateur],
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
};
