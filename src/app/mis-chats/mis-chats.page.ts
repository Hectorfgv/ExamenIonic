import { Component, OnInit } from '@angular/core';
import { IChatUsuarios} from '../interfaces';
import { ToastController } from '@ionic/angular';
import { ProductoService } from '../services/producto.service';
import { AngularFireDatabase } from '@angular/fire/database';
import {UsuarioService} from '../services/usuario.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mis-chats',
  templateUrl: './mis-chats.page.html',
  styleUrls: ['./mis-chats.page.scss'],
})

//Examen 14/2
export class MisChatsPage implements OnInit {

  usuarios:  (IChatUsuarios) [] = [] ;

  constructor( private _db: AngularFireDatabase,  private _activatedRoute: ActivatedRoute, private _usuarioService : UsuarioService ) { }

  ngOnInit() {

    let ref = this._usuarioService.getChatUsusarios();

        ref.orderByChild('usuario').equalTo('n9NDsnNsUMf9yp0RI1GIFRAoP8t3').once("value", snapshot =>{

            snapshot.forEach(child =>{
                this.usuarios.push(child.val());
                console.log("he encontrado: " +child.val().nombre);
            })
        });
    
  }

}
