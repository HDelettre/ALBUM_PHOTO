const USERS = require ("../models/usersModel");

const bcrypt = require("bcrypt");

exports.createNewUser = (req, res) => {
  (async () => {
    // CHECK IF EMAIL EXIST
    const emailExist = await USERS.findOne({
      where : {email : req.body.email}
    });
    if (emailExist) {
      return res.status(501).json({message : "Adresse Email existante"})
    };
    
    // CHECK IF INFORMATION ARE COMPLETE
    // CHECK IF INFORMATION ARE CORRECT /EMAIL & PASSWORD

    // ASH PASSWORD
    const passwordHashed = await bcrypt.hash(req.body.password, 10);
    req.body.password = passwordHashed;
    // CREATE NEW USER
    const newUser =  USERS.build(req.body);
      try {
        await newUser.save();
        return res.status(201).json({message: "Le compte a été créé avec succès !"});
      } catch (error) {
        return res.status(500).json({message: "Erreur de Sauvegarde" + error});
      };
  })();
};

exports.loginUser = (req, res) => {
  (async () => {
    // CHECK IF EMAIL EXIST
    const userData = await USERS.findOne({
      where : {email : req.body.email}
    });
    if (!userData) {
      return res.status(404).json({ message: 'Utilisateur inexistant !'});
    };
    // CHECK IF PASSWORD IS CORRECT
    const validPassword = await bcrypt.compare(
      req.body.password,
      userData.password
    );
    if (!validPassword) {
      return res.status(400).json({ message: 'Mot de passe incorrect !'});
    };
    // CHECK IF FIRST CONNEXION
    if (req.body.password === "GolfScoring") {
      return res.status(202).json({message: "Veuillez changer votre mot de passe !"})
    } else {
      userData.password = "";
      return res.status(200).send(userData);
    };
  })();
};

exports.getAllUsers = (req, res) => {
  (async () => {
    try {
      const reponse = await USERS.findAll();
      // SUPPRESSION DES MDP DANS LA REPONSE
      reponse.forEach(element => {element.password = ""});
      return res.status(200).json(reponse);
    } catch (error) {
      return res.status(404).json({message : "Erreur de connection au serveur !"});
    };
  })();
};

exports.getOneUser = (req, res) => {
  (async () => {
    try {
      const reponse = await USERS.findOne({
        where: {userId : req.params.userId}
      });
      // SUPPRESSION DES MDP DANS LA REPONSE
      reponse.password = "";
      return res.status(200).json(reponse);
    } catch (error) {
      return res.status(404).json({message : "Utilisateur inconnu !"});
    };
  })();
};

exports.updateUser = async (req, res) => {
  if (req.body.password) {
    const passwordHashed = await bcrypt.hash(req.body.password, 10);
    req.body.password = passwordHashed;
  }
  (async () => {
    try {
      await USERS.update(req.body, {
        where: { userId: req.params.userId },
      });
      return res.status(200).json({ message: "profil modifié avec succès :)" });
    } catch (error) {
      return res.status(500).json({ message: "Erreur lors de la modification du profil !" });
    }
  })();
};

exports.deleteUser = (req, res) => {
  (async () => {
    try {
      await USERS.destroy({
        where: { userId: req.params.userId },
      });
      return res
        .status(200)
        .json({ message: "Modèle supprimé avec succès :)" });
    } catch (error) {
      return res.status(500).json({ message: "Erreur : Utilisateur Inconnu !" });
    }
  })();
};
