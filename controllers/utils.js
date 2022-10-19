const utilsModel = require("../models/utils");

module.exports = {
  alerteType: async (req, res) => {
    utilsModel
      .alerteType()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Type.",
        });
      });
  },
};
