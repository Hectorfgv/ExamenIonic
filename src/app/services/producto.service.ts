import { Injectable } from '@angular/core';
import { IProducto, ITecnologia, IInmobiliaria, IMotor, IProductoUsuarios } from '../interfaces';
import { AngularFireDatabase } from '@angular/fire/database';


@Injectable()

export class ProductoService{

   /* productos: (IProducto|ITecnologia|IInmobiliaria| IMotor) [] = [
        {
            nombre : "Taburete",
            descripcion : "De madera",
            categoria: "Hogar",
            precio: 123
        },
        {
            nombre : "Ordenador",
            descripcion : "APPLE",
            categoria: "tecnologia",
            estado: "Perfecto estado",
            precio: 1450
        },
        {
            nombre : "Ferrari",
            descripcion : "LAFERRARI",
            categoria: "motor",
            vehiculo:"coche",
            km:0,
            precio: 2450000
        },
      
      ]
      */

      constructor(private _db: AngularFireDatabase){
       
      }

    getProductos(): firebase.database.Reference{
        let ref = this._db.database.ref("productos");
        return ref;
    }

    getProducto(id){
        let ref = this._db.database.ref("productos/" +id);
        return ref;

    }
    //ex
    getProductosUusarios():firebase.database.Reference{
        let ref = this._db.database.ref("usuariosProductos");
        return ref;
    }
    

    /*getProducto(nombre:string) : IProducto{
      return this.productos.find(x => x.nombre == nombre);
    }
    */
   //ex
   setProductosUsuarios(producto: (IProductoUsuarios)){
    let ref = this._db.database.ref("usuariosProductos");
    ref.push(producto);

    }
    

    setProductos(producto: (IProducto|ITecnologia|IInmobiliaria| IMotor)){
        let ref = this._db.database.ref("productos");
        let insert = ref.push(producto);
        let productId = insert.key;

        ref.child(productId).child("id").set(productId);
    }

    buscar(id: string){
        let ref = this._db.database.ref("productos");

        ref.orderByChild('usuario').equalTo(id).once("value", snapshot =>{

            snapshot.forEach(child =>{
                console.log("he encontrado: " +child.val().nombre);
            })
        });

    }

   eliminar(){
     let ref = this._db.database.ref("productos");
    ref.orderByChild('descripcion').equalTo('asdfas').once("value", snapshot => {
    snapshot.forEach(child => {
    let clave = child.key;
    ref.child(clave).remove();
    })
    });
   } 

   editar(){
    let ref = this._db.database.ref("productos");
    ref.child("Lz91Kp5I0Q04qtsQdeR").set({nombre: 'IPAD2',
    descripcion: 'APPLE',
    categoria:'tecnologia',
    estado:'Perfecto estado',
    usuario: 'n9NDsnNsUMf9yp0RI1GIFRAoP8t2',
    precio: 400});

   }
}