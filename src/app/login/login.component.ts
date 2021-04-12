import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from  '@angular/router';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';

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

  constructor(public auth:AngularFireAuth,  private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm  =  this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  login(){
    // console.log('Email: ${this.email} Password: ${this.pass}');
    this.auth.signInWithEmailAndPassword(this.email, this.pass).catch(error=>console.log(error.code)).then(result=>console.log(result));
    if(this.email)
    this.router.navigateByUrl('/customers');
  }
}
