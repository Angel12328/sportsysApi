import { Router } from "express";
import { validateAccionDivision } from "../middlewares/validateDivision.js";
import { obtenerDivisiones } from "../controllers/division.controller.js";

const router = Router();

router.get('/',validateAccionDivision,obtenerDivisiones);

export default router;