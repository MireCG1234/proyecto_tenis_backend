const Tenis = require("../database/tenis");
const { v4: uuid } = require("uuid");

// --- JUGADORES ---

const getAllJugadores = () => {
  try {
    const allJugadores = Tenis.getAllJugadores();
    return allJugadores;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || "Error interno al obtener jugadores" };
  }
};

const getOneJugador = (jugadorId) => {
  try {
    const oneJugador = Tenis.getOneJugador(jugadorId);
    if (!oneJugador) {
      throw { status: 404, message: `No se encontró el jugador con id ${jugadorId}` };
    }
    return oneJugador;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || "Error interno al obtener jugador" };
  }
};

// --- PARTIDOS ---

const getAllPartidos = () => {
  try {
    const allPartidos = Tenis.getAllPartidos();
    return allPartidos;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || "Error interno al obtener partidos" };
  }
};

const getOnePartido = (partidoId) => {
  try {
    const onePartido = Tenis.getOnePartido(partidoId);
    if (!onePartido) {
      throw { status: 404, message: `No se encontró el partido con id ${partidoId}` };
    }
    return onePartido;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || "Error interno al obtener partido" };
  }
};

const createNewPartido = (newPartido) => {
  try {
    const partidoToInsert = {
      ...newPartido,
      id: uuid()
    };
    const createdPartido = Tenis.createNewPartido(partidoToInsert);
    return createdPartido;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || "Error interno al crear partido" };
  }
};

module.exports = {
  getAllJugadores,
  getOneJugador,
  getAllPartidos,
  getOnePartido,
  createNewPartido,
};
