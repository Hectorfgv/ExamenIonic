import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth'
import {auth} from 'firebase/app'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  unsername: string = " "
  password: string = " "
  cpassword: string = " " 

  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  async register () {
    const {unsername, password, cpassword} = this
    if(password !== cpassword){
        return console.error("La contraseña no es correcta")
    }
    try{
    const res = await this.afAuth.auth.createUserWithEmailAndPassword(unsername, password)
      console.log(res)
    } catch(error){
      console.dir(error)
    }
  }
}
