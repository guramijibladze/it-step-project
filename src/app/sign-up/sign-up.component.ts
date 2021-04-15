import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, FormBuilder, Validators  } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth'
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  email!:string;
  pass!:string;
  confirmpassword!:string;
  isSignedIn = false

  constructor(public firebaseService : FirebaseService) { }
  ngOnInit(): void {
    if(localStorage.getItem('user')!== null)
    this.isSignedIn= true
    else
    this.isSignedIn = false
  }

  onSubmit(){
  }

   onSignup(){
    this.firebaseService.signup(this.email, this.pass)
    //  console.log(this.email, this.pass);
    if(this.firebaseService.isLoggedIn)
    this.isSignedIn = true
  }

  handleLogout(){
    this.isSignedIn = false
  }
}
