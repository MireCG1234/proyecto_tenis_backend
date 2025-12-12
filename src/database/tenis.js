const DB = require("./db.json");
const fs = require("fs");

// --- JUGADORES ---

const getAllJugadores = () => {
  try {
    return DB.jugadores; // devuelve todos los jugadores
  } catch (error) {
    throw { status: 500, message: error?.message || "Error interno al obtener jugadores" };
  }
};

const getOneJugador = (jugadorId) => {
  try {
    const id = parseInt(jugadorId, 10); // (conversión segura) --> 10 = base decimal
    const jugador = DB.jugadores.find((jugador) => jugador.id === id);

    if (!jugador) {
      throw {
        status: 404,
        message: `No se encontró el jugador con id ${jugadorId}`
      };
    }
    return jugador;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || "Error interno al obtener jugador"
    };
  }
};

const updateOneJugador = (jugadorId, changes) => {
  try {
    const id = parseInt(jugadorId, 10);
    const indexForUpdate = DB.jugadores.findIndex((jugador) => jugador.id === id);

    if (indexForUpdate === -1) {
      throw {
        status: 404,
        message: `No se encontró el jugador con id ${jugadorId}`
      };
    }

    const updatedJugador = {
      ...DB.jugadores[indexForUpdate],
      ...changes,
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };

    DB.jugadores[indexForUpdate] = updatedJugador;
    saveToDatabase(DB);
    return updatedJugador;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};


// --- PARTIDOS ---

const getAllPartidos = () => {
  try {
    return DB.partidos; // devuelve todos los partidos
  } catch (error) {
    throw { status: 500, message: error?.message || "Error interno al obtener partidos" };
  }
};

const getOnePartido = (partidoId) => {
  try {
    const partido = DB.partidos.find((partido) => partido.id === partidoId);
    if (!partido) {
      throw {
        status: 404,
        message: `No se encontró el partido con id ${partidoId}`
      };
    }
    return partido;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || "Error interno al obtener partido" };
  }
};

const createNewPartido = (partidoToInsert) => {
  try {
    const partidoExists = DB.partidos.find((partido) => partido.id === partidoToInsert.id);
    if (!partidoExists) {
      DB.partidos.push(partidoToInsert);
      saveToDatabase(DB);
      return partidoToInsert;
    } else {
      throw {
        status: 400,
        message: `El id ${partidoToInsert.id} ya está en uso`
      };
    }
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || "Error interno al crear partido" };
  }
};

const updateOnePartido = (partidoId, changes) => {
  try {
    const indexForUpdate = DB.partidos.findIndex((partido) => partido.id === partidoId);

    if (indexForUpdate === -1) {
      throw {
        status: 404,
        message: `No se encontró el partido con id ${partidoId}`
      };
    }

    const updatedPartido = {
      ...DB.partidos[indexForUpdate],
      ...changes,
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };

    DB.partidos[indexForUpdate] = updatedPartido;
    saveToDatabase(DB);
    return updatedPartido;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

// --- Guardar en base de datos ---
const saveToDatabase = (DB) => {
  fs.writeFileSync("./src/database/db.json", JSON.stringify(DB, null, 2), {
    encoding: "utf8"
  });
};

module.exports = {
  getAllJugadores,
  getOneJugador,
  updateOneJugador,
  getAllPartidos,
  getOnePartido,
  createNewPartido,
  updateOnePartido,
};
