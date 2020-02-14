import { Component, OnInit } from '@angular/core';
import {UsuarioService} from '../services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { IProductoUsuarios } from '../interfaces';
import { ProductoService } from '../services/producto.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  uid:string;
  productoUsuarios: (IProductoUsuarios) [] =[]; //ex

  constructor(private _activatedRoute: ActivatedRoute, private _usuarioService : UsuarioService, private _productoService : ProductoService, private _toastCtrl:ToastController) { }

  ngOnInit() {
    let username = this._activatedRoute.snapshot.paramMap.get("username");
    let ref = this._usuarioService.getUsuarios();
    ref.orderByChild("usuarios").equalTo(username);
    ref.once("value", snapshot=>{
      snapshot.forEach(child => {

        console.log(username);

        if(child.val().nombre == username){
          this.uid = child.val().id;
          console.log(this.uid);
        }
          });
        });
  }
  //ex
  contarLikes(){
    let ref= this._productoService.getProductosUusarios();

    ref.orderByChild("propietario").equalTo('n9NDsnNsUMf9yp0RI1GIFRAoP8t3').once("value",snapshot => {
      this.productoUsuarios= [];
      snapshot.forEach(child=>{
        let value = child.val();
        this.productoUsuarios.push(value);
      });
      let total=this.productoUsuarios.length;
      this.presentToast(total);
    });
    
  }
  //ex
  async presentToast(total) {
    const toast = await this._toastCtrl.create({
      message: `Te gustan ${total} productos`,
      duration: 1000,
      position: 'bottom'
    });
    toast.present();
  }

}