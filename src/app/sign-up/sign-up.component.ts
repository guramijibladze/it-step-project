import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, FormBuilder, Validators  } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth'
import { FirebaseService } from '../firebase.service';
import { CustomValidators } from 'ngx-custom-validators';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


export class User {
  public firstName!:string;
  public lastName!: string;
  public email!: string;
  public phone!:number;
  public password!: string;
  public confirmpassword!: string;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  registerForm!: FormGroup;
  email!:string;
  pass!:string;
  confirmpassword!:string;
  // password!:any;

  model = new User();
  isSignedIn = false
  message!:boolean;

  constructor(public firebaseService : FirebaseService, private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('user')!== null)
    this.isSignedIn= true
    else
    this.isSignedIn = false
  }


   onSignup(form:any){
    this.firebaseService.signup(this.model.email, this.model.password)
    if(this.firebaseService.isLoggedIn)
    
    this.isSignedIn = true
    this.message = true
    // this.openVerticallyCentered()
    setTimeout(() => { 
      this.message = false;
      this.router.navigate(['/'])
      
      },
       2000);
  }

  // openVerticallyCentered(content:any) {
  //   this.modalService.open(content, { centered: true });
  // }
 
}
