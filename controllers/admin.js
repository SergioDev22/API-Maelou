const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const adminModel = require("../models/admin");
const generateToken = require("../service/token");

module.exports = {
  register: (req, res) => {
    const data = req.body;
    const isSuper = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SECRET
    ).isSuper;

    if (!isSuper) {
      return res.status(401).send({
        error: "Invalid request!",
        message:
          "You are not authorized to perform this action but you are not a super admin",
      });
    }

    // Verifier si le BODY de l'API n'est pas vide
    if (Object.keys(data).length === 0) {
      res.status(400).send({
        message: "Content can not be empty!",
        attributs: {
          nom: "required",
          prenom: "required",
          grade: "required",
          poste: "required",
          nom_utilisateur: "required",
          mot_de_passe: "required",
        },
      });
      return false;
    }

    // Déclarer les champs obligatoires afin de controller
    // si ils sont bien remplis
    const required_attributs = [
      "nom",
      "prenom",
      "grade",
      "poste",
      "nom_utilisateur",
      "mot_de_passe",
    ];

    // Annoncer les attributs qui ne sont pas remplis
    for (let i = 0; i < required_attributs.length; i++) {
      if (
        !data[required_attributs[i]] ||
        data[required_attributs[i]] === "" ||
        data[required_attributs[i]] === null
      ) {
        res.status(400).send({
          message: `Content "${[
            required_attributs[i],
          ]}" must be present and can not be empty or null!`,
        });
        return false;
      }
    }

    // Hasher le mot de passe
    bcrypt.hash(data.mot_de_passe, 10, (err, hash) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || "Some error occurred while hashing password Admin.",
        });
        return false;
      } else {
        // Enregistrer l'utilisateur dans la base de données
        data.mot_de_passe = hash;
        adminModel
          .register(data)
          .then((result) => {
            res.status(201).send({
              message: "Admin registered successfully!",
              id: result.insertId,
              data: {
                nom: data.nom,
                prenom: data.prenom,
                grade: data.grade,
                poste: data.poste,
                nom_utilisateur: data.nom_utilisateur,
                isSuper:
                  data.isSuper !== undefined && data.isSuper === 1
                    ? true
                    : false,
              },
              token: generateToken({
                userId: result.insertId,
                userName: data.nom_utilisateur,
                isAdmin: true,
                isSuper:
                  data.isSuper !== undefined && data.isSuper === 1
                    ? true
                    : false,
              }),
            });
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while registering the Admin.",
            });
          });
      }
    });
  },

  login: (req, res) => {
    const data = req.body;

    // Verifier si le BODY de l'API n'est pas vide
    if (Object.keys(data).length === 0) {
      res.status(400).send({
        message: "Content can not be empty!",
        attributs: {
          nom_utilisateur: "required",
          mot_de_passe: "required",
        },
      });
      return false;
    }

    // Déclarer les champs obligatoires afin de controller
    // si ils sont bien remplis
    const required_attributs = ["nom_utilisateur", "mot_de_passe"];

    // Annoncer les attributs qui ne sont pas remplis
    for (let i = 0; i < required_attributs.length; i++) {
      if (
        !data[required_attributs[i]] ||
        data[required_attributs[i]] === "" ||
        data[required_attributs[i]] === null
      ) {
        res.status(400).send({
          message: `Content "${[
            required_attributs[i],
          ]}" must be present and can not be empty or null!`,
        });
        return false;
      }
    }

    adminModel
      .login(data)
      .then((result) => {
        if (result.length > 0) {
          bcrypt.compare(
            data.mot_de_passe,
            result[0].mot_de_passe,
            (err, response) => {
              if (err) {
                res.status(500).send({
                  message:
                    err.message ||
                    "Some error occurred while comparing password Admin.",
                });
                return false;
              } else {
                if (response) {
                  res.status(200).send({
                    message: "Admin logged in successfully!",
                    data: {
                      nom: result[0].nom,
                      prenom: result[0].prenom,
                      grade: result[0].grade,
                      poste: result[0].poste,
                      nom_utilisateur: result[0].nom_utilisateur,
                      isSuper: result[0].isSuper === 1 ? true : false,
                    },
                    token: generateToken({
                      userId: result[0].id,
                      userName: result[0].nom_utilisateur,
                      isAdmin: true,
                      isSuper: result[0].isSuper === 1 ? true : false,
                    }),
                  });
                } else {
                  res.status(401).send({
                    message: "Invalid password!",
                  });
                }
              }
            }
          );
        } else {
          res.status(401).send({
            message: "Invalid username!",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while logging in the Admin.",
        });
      });
  },
};
