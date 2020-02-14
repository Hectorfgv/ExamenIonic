import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { IProducto, ITecnologia, IInmobiliaria, IMotor } from '../interfaces';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  id: string;
  nombre: string;
  descripcion: string;
  categoria:string;
  precio: number;
  
  productos: (IProducto|ITecnologia|IInmobiliaria| IMotor);

  constructor(private _activatedRoute: ActivatedRoute, private _productoService: ProductoService) { }

  ngOnInit() {
    this.id = this._activatedRoute.snapshot.paramMap.get('id')
    let ref = this._productoService.getProducto(this.id)

    ref.once("value",snapshot=>{
      this.productos = snapshot.val();
    })

    console.log("He recibido: " +this.nombre)
    //this._productoService.getProductos();

   /* let res1=this._productoService.getProducto(this.nombre)
    this.precio=+this._productoService.getProducto(this.nombre)
    this.precio=res1.precio
    console.log("El precio es: "+ res1.precio)
    this.descripcion = res1.descripcion
    console.log("Descripcion: "+ this.descripcion)
    this.categoria = res1.categoria
    console.log("Categoria: "+ this.categoria)
    
  */
  }

}