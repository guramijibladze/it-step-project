import { Customer } from './Customer';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
// Firebase Realtime Database imports
import { AngularFireDatabase, AngularFireList  } from '@angular/fire/database';


@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  isLoggedIn = false;
  messages: any =[];
  customersRef: AngularFireList<Customer>;
  private dbPath = 'messages';

  constructor(
    public firebaseAuth: AngularFireAuth,
    private realtimeDb: AngularFireDatabase
  ) {
    this.customersRef = realtimeDb.list('messages');
  }

  async signin(email: string, pass: string) {
    await this.firebaseAuth
      .signInWithEmailAndPassword(email, pass)
      .then((res) => {
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user));
      });
  }
  async signup(email: string, pass: string) {
    await this.firebaseAuth
      .createUserWithEmailAndPassword(email, pass)
      .then((res) => {
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user));
      });
  }
  logout() {
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
  }

  getCustomersList(): AngularFireList<Customer> {
    return this.customersRef;
  }

  updateCustomer(key: string, value: any): Promise<void> {
    return this.customersRef.update(key, value);
  }

  deleteCustomer(key: string): Promise<void>{
    return this.customersRef.remove(key)
  }


  sendMessage(customer: any) {
    this.realtimeDb
      .list('messages')
      .push(customer);
    // this.realtimeDb.object('messages').update({ last_updated_at: currTime });
  }
}
