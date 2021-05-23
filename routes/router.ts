import { Router, Request, Response } from 'express';
import { usuariosConectados } from '../sockets/sockets';
import Server from '../classes/server';

const router = Router();

router.get('/mensajes', ( req: Request, res: Response ) => {
  res.json({
    ok: true,
    mensaje: 'Todo está OK !!!'
  });
});

router.post('/mensajes', ( req: Request, res: Response ) => {

  const cuerpo = req.body.cuerpo;
  const de = req.body.de;

  const payload = {
    de,
    cuerpo
  }

  const server = Server.instance;

  server.io.emit( 'mensaje-nuevo', payload );

  res.json({
    ok: true,
    mensaje: 'POST - Listo',
    cuerpo,
    de
  });
});

router.post('/mensajes/:id', ( req: Request, res: Response ) => {

  const cuerpo = req.body.cuerpo;
  const de = req.body.de;
  const id = req.params.id;

  const payload = {
    de,
    cuerpo
  }

  const server = Server.instance;

  server.io.in( id ).emit( 'mensaje-privado', payload );

  res.json({
    ok: true,
    id,
    mensaje: 'POST - Listo',
    cuerpo,
    de
  });
});

// Servicio para obtener todos los IDs de los usuarios
router.get('/usuarios', ( req: Request, res: Response ) => {

  const server = Server.instance;

  server.io.allSockets()
    .then( clientes => {
      res.json({
        ok:true,
        clientes: Array.from( clientes )
      });
    })
    .catch( err => {
      res.json({
        ok: false,
        err
      });
    });
});

// Obtener Usuarios y sus Nombres
router.get('/usuarios/detalle', ( req: Request, res: Response ) => {

  res.json({
    ok:true,
    clientes: usuariosConectados.getLista()
  });

});

export default router;