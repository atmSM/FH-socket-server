import Server from './classes/server';
import router from "./routes/router";
import bodyParser from 'body-parser';
import cors from 'cors';

const server = Server.instance;

// BodyParser --> Debe definirse antes que las rutas.
server.app.use( bodyParser.urlencoded({ extended: true }) );
server.app.use( bodyParser.json() );

// CORS
server.app.use( cors({ origin: true, credentials: true }) );

// Rutas de servicios
server.app.use('/', router);

server.start( () => {
  console.log( `Servidor arrancado en el puerto ${ server.port }` );
});