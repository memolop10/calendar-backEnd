const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors')
require('dotenv').config();

//crear servidor de express

const app = express();

//Base de datos
dbConnection();

//Cors
app.use(cors())

// Directorio Publico
app.use( express.static('public') )

//Lectura y parseo del body
app.use( express.json() )

//routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))

//Escuchar peticion
app.listen( process.env.PORT, () => console.log(`servidor escuchando en ${ process.env.PORT }`));