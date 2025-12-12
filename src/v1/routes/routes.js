const express = require("express");
const router = express.Router();
const tenisController = require("../../controllers/tenisController");

// cache para acelerar peticiones GET
const apicache = require("apicache");
const cache = apicache.middleware;

// --- Rutas de jugadores ---
router.get("/jugadores", tenisController.getAllJugadores);
router.get("/jugadores/:jugadorId", tenisController.getOneJugador);
router.patch("/jugadores/:jugadorId", tenisController.updateOneJugador);

// --- Rutas de partidos ---
router.get("/partidos", tenisController.getAllPartidos);
router.get("/partidos/:partidoId", tenisController.getOnePartido);
router.post("/partidos", tenisController.createNewPartido);
router.patch("/partidos/:partidoId", tenisController.updateOnePartido);

module.exports = router;
