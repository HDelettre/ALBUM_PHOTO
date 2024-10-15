const PICTURES = require("../models/picturesModel");
const ALBUMS = require("../models/albumsModel");

exports.addPicture = async (req, res) => {
  const newPicture = PICTURES.build(req.body);
  const pictureFile = await JSON.parse(JSON.stringify(req.files.newPicture))[0];
  newPicture["fileName"] = await pictureFile.filename;
  try {
    await newPicture.save();
    return res.status(201).json({ message: "L'image a bien été ajoutée !" });
  } catch (error) {
    return res.status(500).json({ message: "Erreur du serveur !" });
  }
};

exports.getAllPictures = async (req, res) => {
  try {
    const allPictures = await PICTURES.findAll({
      where: { albumId: req.params.albumId },
    });
    if (!allPictures) {
      return res.status(404).json({ message: "Aucune image trouvée !" });
    }
    return res.status(200).json(allPictures);
  } catch (error) {
    return res.status(500).json({ message: "Erreur du serveur !" });
  }
};

exports.getOnePicture = async (req, res) => {
  try {
    const pictureExist = await PICTURES.findOne({
      where: { pictureId: req.params.pictureId },
    });
    if (!pictureExist) {
      return res.status(404).json({ message: "L'image n'existe pas !" });
    }
    return res.status(200).json(pictureExist);
  } catch (error) {
    return res.status(500).json({ message: "Erreur du serveur !" });
  }
};

exports.updatePicture = async (req, res) => {
  const pictureExist = await PICTURES.findOne({
    where: { pictureId: req.params.pictureId },
  });
  if (!pictureExist) {
    return res.status(404).json({ message: "L'image n'existe pas !" });
  }
  // PROPRIETAIRE ALBUM
  const albumOwner = await ALBUMS.findOne({
    where: { albumId: pictureExist.albumId },
  });
  if (!albumOwner) {
    return res
      .status(404)
      .json({ message: "L'album de la photo n'existe pas !" });
  }
  if (albumOwner.userId !== req.body.userId) {
    return res
      .status(401)
      .json({ message: "Vous n'êtes pas autorisé à modifier cette image !" });
  }
  try {
    await PICTURES.update(req.body, {
      where: { pictureId: req.params.pictureId },
    });
    return res.status(200).json({ message: "L'image a bien été modifiée !" });
  } catch (error) {
    return res.status(500).json({ message: "Erreur du serveur !" });
  }
};

exports.deletePicture = async (req, res) => {
  const pictureExist = await PICTURES.findOne({
    where: { pictureId: req.params.pictureId },
  });
  if (!pictureExist) {
    return res.status(404).json({ message: "L'image n'existe pas !" });
  }
  // PROPRIETAIRE ALBUM
  const albumOwner = await ALBUMS.findOne({
    where: { albumId: pictureExist.albumId },
  });
  if (!albumOwner) {
    return res
      .status(404)
      .json({ message: "L'album de la photo n'existe pas !" });
  }
  if (albumOwner.userId !== req.body.userId) {
    return res
      .status(401)
      .json({ message: "Vous n'êtes pas autorisé à modifier cette image !" });
  }
  try {
    await PICTURES.destroy({
      where: { pictureId: req.params.pictureId },
    });
    return res.status(200).json({ message: "L'image a bien été supprimée !" });
  } catch (error) {
    return res.status(500).json({ message: "Erreur du serveur !" });
  }
};
