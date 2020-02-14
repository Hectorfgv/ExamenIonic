import { Component, OnInit } from '@angular/core';
import { IProducto, ITecnologia, IInmobiliaria, IMotor } from '../interfaces';
import { ToastController } from '@ionic/angular';
import { ProductoService } from '../services/producto.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-mis-productos',
  templateUrl: './mis-productos.page.html',
  styleUrls: ['./mis-productos.page.scss'],
})
export class MisProductosPage implements OnInit {

  categoria: string;

  productos: (IProducto|ITecnologia|IInmobiliaria| IMotor) [] = [] ;

  constructor( private _toastCtrl : ToastController, private _productosService :ProductoService, private _db: AngularFireDatabase) {}

  ngOnInit() {

    let ref = this._productosService.getProductos();

        ref.orderByChild('usuario').equalTo('n9NDsnNsUMf9yp0RI1GIFRAoP8t2').once("value", snapshot =>{

            snapshot.forEach(child =>{
                this.productos.push(child.val());
                console.log("he encontrado: " +child.val().nombre);
            })
        });
    
  }

  async presentToast()
  {
    const toast = await this._toastCtrl.create({
      message: 'Producto eliminado correctamente ',
      duration: 1000,
      position: 'bottom'
    });
    toast.present();
  }

  remove(id){
    let ref = this._productosService.getProducto(id);
    console.log(id);
    ref.remove();
    this.presentToast();
  }

  editar()
  {
    this._productosService.editar();
  }

  filter(categoria)
  {
    this.categoria = categoria;
  }

  


}
