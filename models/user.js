const db = require("./../service/connect");

module.exports = {
  register: (data) => {
    return new Promise((resolve, reject) => {
      db.query(
        ` 
            INSERT INTO utilisateur (nom, prenom, cin,
            facebook, adresse, numero_telephone, mot_de_passe, pdcUrl)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
          data.nom,
          data.prenom,
          data.cin,
          data.facebook,
          data.adresse,
          data.numero_telephone,
          data.mot_de_passe,
          data.pdcUrl,
        ],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },

  login: (numero_telephone) => {
    return new Promise((resolve, reject) => {
      db.query(
        ` 
          SELECT * FROM utilisateur WHERE numero_telephone = ?
        `,
        [numero_telephone],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },
};
