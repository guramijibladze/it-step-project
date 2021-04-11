import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, FormBuilder, Validators  } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  // userForm:any;
  // userArray:any = [];
  

  // constructor(private formBuilder: FormBuilder) { }

  // ngOnInit() {
  //   this.userForm = this.formBuilder.group({
  //     firstName: ['', [Validators.required]],
  //     lastName: ['',[Validators.required]],
  //     email: ['', [Validators.required]],
  //     phone: ['', [Validators.required]],
  //     password: ['', [Validators.required]],
  //     confirmpassword: ['', [Validators.required]],
  //     accept: ['', [Validators.required]]
  //   });
  // }

  // onSubmit(){
    
  //   // console.log(this.userForm.value.password)
  //   if(this.userForm.value.password !== this.userForm.value.confirmpassword){
  //     alert('confirmpassword  is not valid!!')
  //   }else{
  //     alert('User form is valid!!')
  //     this.userArray.push(this.userForm)
  //     console.log(this.userArray)
  //   }
  //   // this.userForm.value.firstName = ""
  // }

  email!:string;
  pass!:string;
  confirmpassword!:string;

  constructor(public auth:AngularFireAuth) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if( this.pass == this.confirmpassword ){
      // console.log("password is  valid")
      this.auth.createUserWithEmailAndPassword(this.email, this.pass).catch(error=>console.log(error.code)).then(result=>console.log(result));
    }else{
      console.log("password is not valid")
    }
    
  }

}
