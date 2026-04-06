import { Router } from "express";
import { validateLigas } from "../middlewares/validateLiga";
import { obtenerLigas } from "../controllers/ligas.controller";

const router = Router();


router.get('/ligas',validateLigas,obtenerLigas);

export default router;