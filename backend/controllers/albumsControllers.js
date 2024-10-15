const ALBUMS = require("../models/albumsModel");

exports.createAlbum = (req, res) => {
  async () => {
    const albumExist = await ALBUMS.findOne({
      where: { albumName: req.body.albumName },
    });
    if (albumExist) {
      return res.status(409).json({ message: "L'album existe déjà !" });
    }
    const newAlbum = ALBUMS.build(req.body);
    try {
      await newAlbum.save();
      return res.status(201).json({ message: "L'album a bien été créé !" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erreur, le serveur nerépond pas !" });
    }
  };
};

exports.getAllAlbums = (req, res) => {
  async () => {
    try {
      const reponse = await ALBUMS.findAll();
      if (!reponse) {
        return res
          .status(404)
          .json({ message: "Aucun album n'a pas été trouvé !" });
      } else {
        return res.status(200).json(reponse);
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erreur, le serveur nerépond pas !" });
    }
  };
};

exports.getOneAlbum = (req, res) => {
  async () => {
    try {
      const reponse = await ALBUMS.findOne({
        where: { albumId: req.params.albumId },
      });
      if (!reponse) {
        return res
          .status(404)
          .json({ message: "L'album n'a pas été trouvé !" });
      } else {
        return res.status(200).json(reponse);
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erreur, le serveur nerépond pas !" });
    }
  };
};

exports.updateAlbum = (req, res) => {
  async () => {
    const albumExist = await ALBUMS.findOne({
      where: { albumId: req.params.albumId },
    });
    if (!albumExist) {
      return res.status(404).json({ message: "L'album n'existe pas !" });
    }
    if (albumExist.userId !== req.body.userId) {
      return res
        .status(401)
        .json({ message: "Vous n'êtes pas autorisé à modifier l'album !" });
    }
    try {
      await ALBUMS.update(req.body, {
        where: { albumId: req.params.albumId },
      });
      return res
        .status(200)
        .json({ message: "L'album a bien été mis à jour !" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erreur, le serveur nerépond pas !" });
    }
  };
};

exports.deleteAlbum = (req, res) => {
  async () => {
    const albumExist = await ALBUMS.findOne({
      where: { albumId: req.params.albumId },
    });
    if (!albumExist) {
      return res.status(404).json({ message: "L'album n'existe pas !" });
    }
    if (albumExist.userId !== req.body.userId) {
      return res
        .status(401)
        .json({ message: "Vous n'êtes pas autorisé à supprimer l'album !" });
    }
    try {
      await ALBUMS.destroy({
        where: { albumId: req.params.albumId },
      });
      return res.status(200).json({ message: "L'album a bien été supprimé !" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erreur, le serveur nerépond pas !" });
    }
  };
};
