import { Customer } from './Customer';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
// Firebase Realtime Database imports
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  isLoggedIn = false;
  messages: any = [];
  customersRef: AngularFireList<Customer>;
  email!: string;
  pass!: string;
  user!:any;
  getInfoId!:any;

  constructor(public firebaseAuth : AngularFireAuth, private router: Router,
    private realtimeDb: AngularFireDatabase) {
      this.customersRef = realtimeDb.list('messages');
    }

   signin(email: string, pass : string){
     this.firebaseAuth.signInWithEmailAndPassword(email,pass)
    .then(res=>{
      // this.isLoggedIn = true
      localStorage.setItem('user',JSON.stringify(res.user))
      this.router.navigate(['/customers'])
      .then(nav => {
        console.log(nav); // true if navigation is successful
      }, err => {
        console.log(err) // when there's an error
      });
    });
  }

  signup(email: string, pass: string) {
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, pass)
      .then((res) => {
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user));
        this.user = res.user;
        // console.log(this.user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  logout() {
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
  }

  addCustomer(customer: any) {
    this.realtimeDb.list('messages').push(customer);
  }

  addCustomerRoom(roomData: any, index: any ){
    // this.customersRef.remove('messages/'+ index + '/rooms/');
    this.realtimeDb.list('messages/'+ index).set('rooms', roomData);
  }

  getCustomersList(): AngularFireList<Customer> {
    // console.log(this.customersRef)
    return this.customersRef;
  }

  updateCustomer(key: string, value: any): Promise<void> {
    return this.customersRef.update(key, value);
  }

  deleteCustomer(key: string): Promise<void> {
    return this.customersRef.remove(key);
  }
}
