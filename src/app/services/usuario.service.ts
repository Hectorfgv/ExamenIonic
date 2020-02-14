import { Injectable } from '@angular/core';
import { IProducto, ITecnologia, IInmobiliaria, IMotor } from '../interfaces';
import { AngularFireDatabase } from '@angular/fire/database';


@Injectable()

export class UsuarioService{
    constructor(private _db:AngularFireDatabase){}

    getUsuarios(){
        let ref = this._db.database.ref("usuarios");
        return ref;
   
}
}