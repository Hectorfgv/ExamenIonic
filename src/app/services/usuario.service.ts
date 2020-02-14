import { Injectable } from '@angular/core';
import { IProducto, ITecnologia, IInmobiliaria, IMotor, IChatUsuarios } from '../interfaces';
import { AngularFireDatabase } from '@angular/fire/database';


@Injectable()

export class UsuarioService{
    constructor(private _db:AngularFireDatabase){}

    getUsuarios(){
        let ref = this._db.database.ref("usuarios");
        return ref;
   
}
//Examen 14/2
getChatUsusarios():firebase.database.Reference{
    let ref = this._db.database.ref("usuarios");
    return ref;
}
setChatUsusarios(usuarios: (IChatUsuarios)){
    let ref = this._db.database.ref("usuarios");
    ref.push(usuarios);

    }
}