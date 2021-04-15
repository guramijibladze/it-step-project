import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email!:string;
  pass!:string;
  // user:any = 0;
  // user = firebase.auth().currentUser;

  loginForm!: FormGroup;
  isSubmitted  =  false;
  isSignedIn = false

  constructor(public auth:AngularFireAuth, public firebaseService : FirebaseService) { }

  ngOnInit(): void {
  
  }
   onSignin(){
    this.firebaseService.signin(this.email,this.pass)
    if(this.firebaseService.isLoggedIn)
    this.isSignedIn = true
  }

  handleLogout(){
    this.isSignedIn = false
  }
 
}
