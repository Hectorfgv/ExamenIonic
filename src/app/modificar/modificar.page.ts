import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITecnologia, IInmobiliaria, IMotor, IProducto } from '../interfaces';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.page.html',
  styleUrls: ['./modificar.page.scss'],
})
export class ModificarPage implements OnInit {

  id: string;
  productos: (IProducto & ITecnologia & IInmobiliaria & IMotor) = { "id":"","nombre": "","descripcion": "","categoria": "", "usuario": "",  "precio": 0, "estado": "", "metros": 0, "habitaciones": 0, "banios": 0, "localidad": "","vehiculo": "", "km": 0, "anio": 0}

  constructor(private _activatedRoute: ActivatedRoute, private _productoService: ProductoService) { }

  modificar(idProduct) {


    let ref = this._productoService.getProducto(idProduct);

    ref.once("value", snapshot => {
      if (snapshot.child("categoria").val() == "hogar") {
        ref.child("nombre").set(this.productos.nombre);
        ref.child("descripcion").set(this.productos.descripcion);
        ref.child("precio").set(this.productos.precio);
        ref.child("categoria").set(this.productos.categoria);
      }

      if (snapshot.child("categoria").val() == "tecnologia") {
        ref.child("nombre").set(this.productos.nombre);
        ref.child("descripcion").set(this.productos.descripcion);
        ref.child("precio").set(this.productos.precio);
        ref.child("estado").set(this.productos.estado);
        ref.child("categoria").set(this.productos.categoria);
      }

      if (snapshot.child("categoria").val() == "inmobiliaria") {
        ref.child("nombre").set(this.productos.nombre);
        ref.child("descripcion").set(this.productos.descripcion);
        ref.child("precio").set(this.productos.precio);
        ref.child("metros").set(this.productos.metros);
        ref.child("habitaciones").set(this.productos.habitaciones);
        ref.child("banios").set(this.productos.banios);
        ref.child("localidad").set(this.productos.localidad);
        ref.child("categoria").set(this.productos.categoria);
      }

      if (snapshot.child("categoria").val() == "motor") {
        ref.child("nombre").set(this.productos.nombre);
        ref.child("descripcion").set(this.productos.descripcion);
        ref.child("precio").set(this.productos.precio);
        ref.child("vehiculo").set(this.productos.vehiculo);
        ref.child("km").set(this.productos.km);
        ref.child("categoria").set(this.productos.categoria);
      }
    }

    );
  }

  ngOnInit() {
    this.id = this._activatedRoute.snapshot.paramMap.get("id");
    let ref = this._productoService.getProducto(this.id);
    ref.once("value", snapshot => {
      this.productos = snapshot.val();
    });
  }

}