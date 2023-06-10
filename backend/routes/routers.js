import { Router } from "express";
const router = Router();
import {
  addMarket,
  addResponsable,
  addAttachement,
  addService,
  addMateriel,
  deleteMaterielByNature,
  deleteMaterielByID,
  getMaterielByDesignation,
  getMateriels,
  getMaterielByTitle,
  updateMaterialByID,
  getAttachements,
  getServices


} from "../controllers/controller.js";

// crud   create,read,update,delete

router.post("/addMarket", addMarket);

router.post("/addResponsable", addResponsable);
router.post("/addAttachement", addAttachement);
router.post("/addService", addService);

router.post("/addMateriel", addMateriel);
router.delete("/deleteMaterielByNature/:nature", deleteMaterielByNature);
router.delete("/deleteMaterielByID/:id", deleteMaterielByID);
router.put("/updateMaterialByID/:id", updateMaterialByID);
router.get("/getMaterielByTitle/:title", getMaterielByTitle);
router.get("/getMaterielByDesignation/:designation", getMaterielByDesignation);
router.get("/getMateriels", getMateriels);
router.get("/getAttachements", getAttachements);
router.get("/getServices", getServices);


export default router;
