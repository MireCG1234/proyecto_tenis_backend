// **** PRUEBAS DE MÉTODOS CON EXPRESS ****

const express = require('express')
const cors = require('cors')
const v1TenisRouter = require("./v1/routes/routes")

const app = express() 
app.use(express.json())

app.use(cors()) //No fufa mu bien cuando runneas el proyecto

const puerto = 3002

app.use("/api/v1/tenis",v1TenisRouter) //URL base para hacer peticiones

app.listen(puerto)
console.log(`Se está ejecutando correctamente en el puerto ${puerto}`)


// ORDEN DE LÓGICA: 
/*    1. INDEX.JS       -->   Inicio del servicio
      2. ROUTER.JS      -->   Recibe endpoint (con/sin parametros) y se lo pasa al controlador
      3. CONTROLLER.JS  -->   Gestiona lo que le llega de la ruta (con sus errores)
      4. SERVICE.JS     -->   Coge un metodo del Utils para pedir info a la BD
      5. UTILS.JS       -->   Llama a la BD para traer la info (con/sin parametros)
*/