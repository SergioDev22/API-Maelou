const db = require("./../service/connect");

module.exports = {
  alerteType: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM Type", (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },

  statusType: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM Status LIMIT 4", (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },
};
