const express = require("express");
const router = express.Router();
const tenisController = require("../../controllers/tenisController");

// cache para acelerar peticiones GET
const apicache = require("apicache");
const cache = apicache.middleware;

// --- Rutas de jugadores ---
router.get("/jugadores", tenisController.getAllJugadores);
router.get("/jugador/:jugadorId", tenisController.getOneJugador);

// --- Rutas de partidos ---
router.get("/partidos", tenisController.getAllPartidos);
router.get("/partido/:partidoId", tenisController.getOnePartido);
router.post("/partido", tenisController.createNewPartido);

module.exports = router;
