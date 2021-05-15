import { Router, Request, Response } from 'express';

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

  res.json({
    ok: true,
    id,
    mensaje: 'POST - Listo',
    cuerpo,
    de
  });
});

export default router;