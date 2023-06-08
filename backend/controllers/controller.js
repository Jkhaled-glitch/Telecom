import Responsable from "../models/responsable.js";
import Market from "../models/market.js";
import Materiel from "../models/Materiel.js";

// add market
const addMarket = async (req, res) => {
  try {
    console.log(req.body);
    const newMarket = await new Market(req.body).save();
    res.status(201).send(newMarket);
  } catch (error) {
    console.log(error);

    res.status(409).json({ message: error.message });
  }
};

// add responsable
const addResponsable = async (req, res) => {
  try {
    const newResponsable = await new Responsable(req.body).save();
    res.status(201).send(newResponsable);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};

// add materiel
const addMateriel = async (req, res) => {
  try {
    const newMateriel = await new Materiel(req.body).save();
    res.status(201).send(newMateriel);
  } catch (error) {
    console.log(error);

    res.status(409).json({ message: error.message });
  }
};

// delete materiel by nature
const deleteMaterielByNature = async (req, res) => {
  try {
    console.log(req.params.nature);
    const materiel = await Materiel.findOneAndDelete({
      nature: req.params.nature,
    });
    console.log(materiel);
    res.status(200).send(materiel);
  } catch (error) {
    console.log(error);
  }
};

// delete materiel by name
const deleteMaterielByID = async (req, res) => {
  try {
    console.log(req.params.id);
    const materiel = await Materiel.findOneAndDelete({
      _id : req.params.id,
    });
    console.log(materiel);
    res.status(200).send(materiel);
  } catch (error) {
    console.log(error);
  }
};


// get materiel by title
const getMaterielByTitle = async (req, res) => {
  try {
    console.log(req.params.title);
    const materiels = await Materiel.find({
      title: req.params.title,
    });
    console.log(materiels);
    res.status(200).send(materiels);
  } catch (error) {
    console.log(error);
  }
};

// get materiel by designation
const getMaterielByDesignation = async (req, res) => {
  try {
    console.log(req.params.designation);
    const materiel = await Materiel.findOne({
      designation: req.params.designation,
    });
    console.log(materiel);
    res.status(200).send(materiel);
  } catch (error) {
    console.log(error);
  }
};


// getMateriels
const getMateriels = async (req, res) => {
  try {
    const materiels = await Materiel.find();
    res.status(200).send(materiels);
  } catch (error) {
    console.log(error);
  }
};
// update material by id
const updateMaterialByID = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.params.id);

    const filter = { _id : req.params.id };
    const update = req.body;

    const material = await Materiel.findOne(filter);

    if (!material) {
      return res.status(404).send("Material not found");
    }

    const newMateriel = await Materiel.findOneAndUpdate(filter, update, { new: true });
      console.log(newMateriel);
    res.status(200).send(newMateriel);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

export {
  addMarket,
  addResponsable,
  addMateriel,
  deleteMaterielByNature,
  getMaterielByDesignation,
  deleteMaterielByID,
  getMaterielByTitle,
  getMateriels,
  updateMaterialByID,
};
