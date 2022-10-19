const alerteModel = require("../models/alert");

module.exports = {
  sendAlert: (req, res) => {
    const data = req.body;

    if (Object.keys(data).length === 0) {
      res.status(400).json({
        message: "Content can not be empty!",
        attributs: {
          longitude: "required",
          latitude: "required",
          id_Utilisateur: "required",
          id_Type: "required",
        },
      });
      return false;
    }

    const require_attributs = [
      "longitude",
      "latitude",
      "id_Utilisateur",
      "id_Type",
    ];

    for (let i = 0; i < require_attributs.length; i++) {
      if (
        !data[require_attributs[i]] ||
        data[require_attributs[i]] === "" ||
        data[require_attributs[i]] === null
      ) {
        res.status(400).json({
          message: `Content "${[
            require_attributs[i],
          ]}" must be present and can not be empty or null!`,
        });
        return false;
      }
    }

    alerteModel
      .sendAlert(data)
      .then((result) => {
        res.status(200).send({
          id: result.insertId,
          message: "Alert sended succesfuly!",
        });
      })
      .catch((err) =>
        res.status(500).send({
          message:
            err.message || "Some error occurred while sending the alert.",
        })
      );
  },
};
