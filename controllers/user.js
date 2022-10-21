const bcrypt = require("bcrypt");
const userModel = require("../models/user");
const generateToken = require("./../service/token");

module.exports = {
  register: (req, res) => {
    const pdc = req.file;
    const data = req.body;

    // Verifier si le BODY de l'API n'est pas vide
    if (Object.keys(data).length === 0) {
      res.status(400).send({
        message: "Content can not be empty!",
        attributs: {
          nom: "required",
          prenom: "required",
          facebook: "required",
          adresse: "required",
          numero_telephone: "required",
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
      "facebook",
      "adresse",
      "numero_telephone",
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

    // Hasher le mot de passe avant de l'enregistrer dans la base de données
    bcrypt.hash(data.mot_de_passe, 10, (err, hash) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Some error occurred while hashing password.",
        });
        return false;
      } else {
        // Remplacer le mot de passe par son hash
        data.mot_de_passe = hash;

        // Enregistrer l'utilisateur dans la base de données
        userModel
          .register({
            ...data,
            pdcUrl:
              pdc !== undefined
                ? `${req.protocol}://${req.get("host")}/pdc/${
                    req.file.filename
                  }`
                : null,
          })
          .then((result) => {
            // Tant que l'utilisateur est enregistré dans la base de données
            // Faut la retourner les information de connexion de l'utilisateur
            // Pour qu'il puisse se connecter aprer l'inscription
            res.status(201).send({
              message: "User registered successfully!",
              data: {
                id: result.insertId,
                nom: data.nom,
                prenom: data.prenom,
                adresse: data.adresse,
                token: generateToken({
                  userId: result.insertId,
                  userNumber: data.numero_telephone,
                }),
              },
            });
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while registering user.",
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
          numero_telephone: "required",
          mot_de_passe: "required",
        },
      });
      return false;
    }

    // Déclarer les champs obligatoires afin de controller
    // si ils sont bien remplis
    const required_attributs = ["numero_telephone", "mot_de_passe"];

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

    // Chercher l'utilisateur dans la base de données
    userModel
      .login(data.numero_telephone)
      .then((result) => {
        if (result.length > 0) {
          // Comparer le mot de passe entré avec celui de la base de données
          bcrypt.compare(
            data.mot_de_passe,
            result[0].mot_de_passe,
            (err, isMatch) => {
              if (err) {
                res.status(500).send({
                  message:
                    err.message ||
                    "Some error occurred while comparing password.",
                });
                return false;
              } else if (isMatch) {
                // Si le mot de passe correspond, retourner les informations de connexion
                res.status(200).send({
                  message: "User logged in successfully!",
                  data: {
                    id: result[0].id,
                    nom: result[0].nom,
                    prenom: result[0].prenom,
                    adresse: result[0].adresse,
                    token: generateToken({
                      userId: result[0].id,
                      userNumber: result[0].numero_telephone,
                    }),
                  },
                });
              } else {
                res.status(401).send({
                  message: "Invalid password!",
                });
              }
            }
          );
        } else {
          res.status(404).send({
            message: `User not found with phone number "${data.numero_telephone}".`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while logging user.",
        });
      });
  },
};
