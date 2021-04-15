import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  email!: string;
  pass!: string;

  isLoggedIn = false
  constructor(public firebaseAuth : AngularFireAuth) { }
  
   signin(email: string, pass : string){
     this.firebaseAuth.signInWithEmailAndPassword(email,pass)
    .then(res=>{
      this.isLoggedIn = true
      localStorage.setItem('user',JSON.stringify(res.user))
    })
  }
   signup(email: string, pass : string){
     this.firebaseAuth.createUserWithEmailAndPassword(email,pass)
    .then(res=>{
      this.isLoggedIn = true
      localStorage.setItem('user',JSON.stringify(res.user))
    })
  }
  logout(){
    this.firebaseAuth.signOut()
    localStorage.removeItem('user')
  }
}
