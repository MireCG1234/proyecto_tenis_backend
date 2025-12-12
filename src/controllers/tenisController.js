const tenisService = require("../services/tenisService")

// --- JUGADORES ---

const getAllJugadores = (req, res) => {
  try {
    const allJugadores = tenisService.getAllJugadores();
    res.send({ status: "OK", data: allJugadores });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: { error: error?.message || "Error interno del servidor" }
    });
  }
};

const getOneJugador = (req, res) => {
  const { jugadorId } = req.params;

  if (!jugadorId) {
    return res.status(400).send({
      status: "FAILED",
      data: { error: "El parámetro ':jugadorId' no puede estar vacío" }
    });
  }

  try {
    const jugador = tenisService.getOneJugador(jugadorId);
    if (!jugador) {
      return res.status(404).send({
        status: "FAILED",
        data: { error: `No se encontró el jugador con id ${jugadorId}` }
      });
    }
    res.send({ status: "OK", data: jugador });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: { error: error?.message || "Error interno del servidor" }
    });
  }
};

const updateOneJugador = (req, res) => {
  const { jugadorId } = req.params;
  const changes = req.body;

  if (!jugadorId) {
    return res.status(400).send({
      status: "FAILED",
      data: { error: "El parámetro ':jugadorId' no puede estar vacío" }
    });
  }

  try {
    const updatedJugador = tenisService.updateOneJugador(jugadorId, changes);
    res.send({ status: "OK", data: updatedJugador });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: { error: error?.message || "Error interno al actualizar jugador" }
    });
  }
};

// --- PARTIDOS ---

const getAllPartidos = (req, res) => {
  try {
    const allPartidos = tenisService.getAllPartidos();
    res.send({ status: "OK", data: allPartidos });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: { error: error?.message || "Error interno del servidor" }
    });
  }
};

const getOnePartido = (req, res) => {
  const { partidoId } = req.params;

  if (!partidoId) {
    return res.status(400).send({
      status: "FAILED",
      data: { error: "El parámetro ':partidoId' no puede estar vacío" }
    });
  }

  try {
    const partido = tenisService.getOnePartido(partidoId);
    if (!partido) {
      return res.status(404).send({
        status: "FAILED",
        data: { error: `No se encontró el partido con id ${partidoId}` }
      });
    }
    res.send({ status: "OK", data: partido });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: { error: error?.message || "Error interno del servidor" }
    });
  }
};


const createNewPartido = (req, res) => {
  const { body } = req;

  // Validación de parámetros obligatorios
  if (
    !body.torneo ||
    !body.ronda ||
    !body.puntajes ||
    !body.jugadores ||
    !body.ganador
  ) {
    return res.status(400).send({
      status: "FAILED",
      data: { error: "Faltan parámetros obligatorios para crear el partido" }
    });
  }

  // Construcción del objeto partido
  const newPartido = {
    torneo: body.torneo,
    ronda: body.ronda,
    puntajes: body.puntajes,   // aquí se espera el objeto con sets y juegos
    jugadores: body.jugadores, // array con IDs de jugadores
    ganador: body.ganador
  };

  try {
    const createdPartido = tenisService.createNewPartido(newPartido);
    res.status(201).send({ status: "OK", data: createdPartido });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: { error: error?.message || error }
    });
  }
};

const updateOnePartido = (req, res) => {
  const { partidoId } = req.params;
  const changes = req.body;

  if (!partidoId) {
    return res.status(400).send({
      status: "FAILED",
      data: { error: "El parámetro ':partidoId' no puede estar vacío" }
    });
  }

  try {
    const updatedPartido = tenisService.updateOnePartido(partidoId, changes);
    res.send({ status: "OK", data: updatedPartido });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: { error: error?.message || "Error interno al actualizar partido" }
    });
  }
};



module.exports = {
      getAllJugadores,
      getOneJugador,
      updateOneJugador,
      getAllPartidos,
      getOnePartido,
      createNewPartido,
      updateOnePartido,
}