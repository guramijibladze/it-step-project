import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { Router } from  '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  email!: string;
  pass!: string;

  isLoggedIn = false
  constructor(public firebaseAuth : AngularFireAuth,private router: Router) { }
  
   signin(email: string, pass : string){
     this.firebaseAuth.signInWithEmailAndPassword(email,pass)
    .then(res=>{
      this.isLoggedIn = true
      localStorage.setItem('user',JSON.stringify(res.user))
      this.router.navigate(['/customers'])
    .then(nav => {
      console.log(nav); // true if navigation is successful
    }, err => {
      console.log(err) // when there's an error
    });
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
