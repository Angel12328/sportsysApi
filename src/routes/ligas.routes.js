import { Router } from "express";
import { obtenerLigas, obtenerLigasDefault } from "../controllers/ligas.controller.js";
import {validateLigas} from "../middlewares/validateLiga.js";

const router = Router();


router.get('/',validateLigas,obtenerLigas);
router.get('/default',validateLigas,obtenerLigasDefault);

export default router;