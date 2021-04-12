import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from  '@angular/router';
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
  async onSignin(email:string,pass:string){
    await this.firebaseService.signin(email,pass)
    if(this.firebaseService.isLoggedIn)
    this.isSignedIn = true
  }

  handleLogout(){
    this.isSignedIn = false
  }
 
}
