const db = require("./../service/connect");

module.exports = {
  sendAlert: (data) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
            INSERT INTO Alerte (longitude, latitude, id_Utilisateur, id_Type)
            VALUES (?, ?, ?, ?)
        `,
        [data.longitude, data.latitude, data.id_Utilisateur, data.id_Type],
        (err, result) => {
          console.log(err);
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },
};
