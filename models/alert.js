const db = require("./../service/connect");

module.exports = {
  sendAlert: (data) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
            INSERT INTO Alerte (longitude, latitude, id_Utilisateur)
            VALUES (?, ?, ?)
        `,
        [data.longitude, data.latitude, data.id_Utilisateur],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },

  getAllAlertNotClosed: () => {
    return new Promise((resolve, reject) => {
      db.query(
        `
            SELECT  u.id, u.nom,u.prenom, u.cin, u.facebook, u.adresse ,
            a.id, a.date_post, a.longitude, a.latitude,a.id_Type, t.nom as nom_Type,
            a.id_Status , s.nom as nom_Status
            FROM Utilisateur u
            INNER JOIN Alerte a
            ON u.id = a.id_Utilisateur
            INNER JOIN Type t 
            ON a.id_Type = t.id
            INNER JOIN Status s
            ON a.id_Status = s.id
            WHERE a.cloture = 0
        `,
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },

  changeStatusAlert: (data) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
            UPDATE Alerte
            SET id_Status = ?
            WHERE id = ?
        `,
        [data.id_Status, data.id],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },

  setCheckerActionSetStatus: (data, action) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
            INSERT INTO checker
            (id_Alerte, id_Admin, action, value)
            VALUES (?, ?, ?, ?)
        `,
        [data.id, data.id_Admin, action, data.id_Status],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },

  updateToClosedAlert: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
            UPDATE Alerte
            SET cloture = 1 , date_cloture = NOW()
            WHERE id = ?
        `,
        [id],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },

  getAlertPerUser: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
            SELECT  a.id, a.date_post, a.longitude, a.latitude, a.id_Type,
            t.nom as nom_Type, a.id_Status , s.nom as nom_Status , a.cloture, a.date_cloture
            FROM Utilisateur u
            INNER JOIN Alerte a
            ON u.id = a.id_Utilisateur
            INNER JOIN Type t 
            ON a.id_Type = t.id
            INNER JOIN Status s
            ON a.id_Status = s.id
            WHERE u.id = ?
        `,
        [id],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },
};
