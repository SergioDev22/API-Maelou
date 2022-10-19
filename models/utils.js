const db = require("./../service/connect");

module.exports = {
  alerteType: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM Type", (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  },
};
