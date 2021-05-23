import { Usuario } from './usuario';

export class UsuariosLista {

  private lista: Usuario[] = [];

  constructor() {}

  // Agregar un usuario
  public agregarUsuario( usuario: Usuario ) {
    this.lista.push( usuario );
    console.log( this.lista );
    return usuario;
  }

  public actualizarNombre( id: string, nombre: string ) {
    for ( let usuario of this.lista ) {
      if ( usuario.id === id ) {
        usuario.nombre = nombre; 
        break;
      }
    }

    console.log( '===== Actualizando usuario =====' );
    console.log( this.lista );
  }

  // Obtener lista de usuarios
  public getLista() {
    return this.lista;
  }

  // Obtener un usuario por su Id
  public getUsuarioById( id: string ) {
    return this.lista.find( usuario => usuario.id === id );
  }

  // Obtener los usuarios de una sala
  public getUsuariosBySala( sala: string ) {
    return this.lista.filter( usuario => usuario.sala === sala );
  }

  // Eliminar un usuario
  public borrarUsuario( id: string ) {
    const tempUser = this.getUsuarioById( id );

    this.lista = this.lista.filter( usuario => usuario.id !== id );

    return tempUser;
  }
}