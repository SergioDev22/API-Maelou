const jwt = require("jsonwebtoken");
const alerteModel = require("../models/alert");

module.exports = {
  sendAlert: (req, res) => {
    const data = req.body;
    
    alerteModel
      .sendAlert(data)
      .then((result) => {
        res.status(200).json({
          id: result.insertId,
          message: "Alert sended succesfuly!",
        });
      })
      .catch((err) =>
        res.status(500).json({
          message: "Some error occurred while sending the alert.",
        })
      );
  },

  getAllAlertNotClosed: (req, res) => {
    alerteModel
      .getAllAlertNotClosed()
      .then((results) => {
        let alerts = [];
        for (result of results) {
          alerts.push({
            id: result.id,
            people: {
              id: result.id,
              nom: result.nom,
              prenom: result.prenom,
              cin: result.cin,
              facebook: result.facebook,
              adresse: result.adresse,
            },

            content: {
              date_post: result.date_post,
              longitude: result.longitude,
              latitude: result.latitude,
            },
            type_Alert: { id: result.id_Type, nom: result.nom_Type },
            status_Alert: { id: result.id_Status, nom: result.nom_Status },
          });
        }
        res.status(200).send(alerts);
      })
      .catch((err) =>
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving alerts.",
        })
      );
  },

  changeStatusAlert: (req, res) => {
    const id = req.params.id;
    const data = req.body;

    if (Object.keys(data).length === 0) {
      res.status(400).json({
        message: "Content can not be empty!",
        attributs: {
          id_Status: "required",
          id_Admin: "required",
        },
      });
      return false;
    }

    const require_attributs = ["id_Status", "id_Admin"];
    for (let i = 0; i < require_attributs.length; i++) {
      if (
        !data[require_attributs[i]] ||
        data[require_attributs[i]] === null ||
        isNaN(parseInt(data[require_attributs[i]]))
      ) {
        res.status(400).send({
          message: `Content "${[
            require_attributs[i],
          ]}" must be present and can not be 
          empty or null or string, It must a number value!`,
        });
        return false;
      }
    }

    // Rajouter l'id dans l'objet data envoyer à la BDD
    const finalData = Object.assign(data, { id: id });

    alerteModel
      .changeStatusAlert(finalData)
      .then((result) => {
        alerteModel
          .setCheckerActionSetStatus(finalData, "SETSTATUS")
          .then((result) => {
            res.status(200).send({
              message: `Alert status changed succesfuly for Alert ${finalData.id}`,
            });
          })
          .catch((err) => {
            res.status(500).send({
              message: `Error updating checker action status for Alert ${finalData.id}`,
            });
          });
      })
      .catch((err) =>
        res.status(500).send({
          message:
            err.message ||
            "Some error occurred while changing the alert status.",
        })
      );
  },

  markAlerteAsClosed: (req, res) => {
    const id = req.params.id;
    const data = req.body;

    if (Object.keys(data).length === 0) {
      res.status(400).send({
        message: "Content can not be empty!",
        attributs: {
          id_Admin: "required",
        },
      });
      return false;
    }

    const finalData = Object.assign(data, { id: id, id_Status: 5 });

    alerteModel
      .updateToClosedAlert(id)
      .then((result) => {
        alerteModel
          .setCheckerActionSetStatus(finalData, "SETFINISH")
          .then((result) => {
            res.status(200).send({
              message: `Alert status changed "TERMINE" succesfuly for Alert ${id}`,
            });
          })
          .catch((err) => {
            res.status(500).send({
              message: `Error updating checker action status for Alert ${id}`,
            });
          });
      })
      .catch((err) => {
        res.status(500).send({
          message: `Error updating Alert for Alert ${id}`,
        });
      });
  },

  getAlerPerUser: (req, res) => {
    const id = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SECRET
    ).userId;

    alerteModel
      .getAlertPerUser(id)
      .then((results) => {
        let alerts = [];
        for (result of results) {
          alerts.push({
            id: result.id,
            content: {
              date_post: result.date_post,
              longitude: result.longitude,
              latitude: result.latitude,
            },
            type_Alert: { id: result.id_Type, nom: result.nom_Type },
            status_Alert: { id: result.id_Status, nom: result.nom_Status },
            closed: {
              isClosed: result.cloture === 1 ? true : false,
              date_closed: result.date_cloture,
            },
          });
        }
        res.status(200).send(alerts);
      })
      .catch((err) =>
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving alerts.",
        })
      );
  },
};
