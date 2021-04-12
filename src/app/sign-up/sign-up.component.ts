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
    // if( this.pass == this.confirmpassword ){
    //   // console.log("password is  valid")
    //   this.auth.createUserWithEmailAndPassword(this.email, this.pass).catch(error=>console.log(error.code)).then(result=>console.log(result));
    // }else{
    //   console.log("password is not valid")
    // }
  }

  async onSignup(email:string,pass:string){
    await this.firebaseService.signup(email,pass)
    if(this.firebaseService.isLoggedIn)
    this.isSignedIn = true
  }

  handleLogout(){
    this.isSignedIn = false
  }
}
