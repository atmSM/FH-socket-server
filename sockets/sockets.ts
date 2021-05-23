import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';

export const usuariosConectados = new UsuariosLista();

export const conectarCliente = ( cliente: Socket, io: socketIO.Server ) => {

  const usuario = new Usuario( cliente.id );
  usuariosConectados.agregarUsuario( usuario );

}

// Estamos pendientes de cuando hay una desconexión
export const desconectar = ( cliente: Socket, io: socketIO.Server ) => {

  cliente.on('disconnect', () => {
    // console.log('Cliente desconectado');
    const usuarioTemp = usuariosConectados.borrarUsuario( cliente.id );
    io.emit( 'usuarios-activos', usuariosConectados.getLista() );
    console.log( 'Se desconecto el usuario: ', usuarioTemp!.id );
  });
  
}

// Escuchamos el Login
export const configurarUsuario = ( cliente: Socket, io: socketIO.Server ) => {

  cliente.on('configurar-usuario', ( payload: { nombre: string }, callbadk: Function ) => {
    usuariosConectados.actualizarNombre( cliente.id, payload.nombre );
    io.emit( 'usuarios-activos', usuariosConectados.getLista() );
    callbadk({
      ok: true,
      mensaje: `Usuario ${ payload.nombre } conectado.`
    });
  });

}

// Escuchamos los mensajes
export const mensaje = ( cliente: Socket, io: socketIO.Server ) => {

  cliente.on('mensaje', ( payload: { de: string, cuerpo: string } ) => {
    console.log( 'Mensaje recibido', payload );

    io.emit('mensaje-nuevo', payload );
  });

}

// Obtener usuarios activos
export const obtenerUsuarios = ( cliente: Socket, io: socketIO.Server ) => {

  cliente.on('obtener-usuarios', () => {
    io.to( cliente.id ).emit( 'usuarios-activos', usuariosConectados.getLista() );
  });

}