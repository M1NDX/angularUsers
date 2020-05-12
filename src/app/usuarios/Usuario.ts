export class Usuario{
    nombre: string;
    pass: string;
    estado: string;
    hobbies: string[];
    constructor(nombre:string, pass:string, estado:string, hobbies:string[]){
      this.nombre = nombre;
      this.pass = pass;
      this.estado = estado;
      this.hobbies = hobbies;
    }
  }