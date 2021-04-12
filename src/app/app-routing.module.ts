import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { CustomersComponent } from './customers/customers.component';

const routes: Routes = [
  {path: 'register', component: SignUpComponent },
  { path: '', component: LoginComponent },
  { path: 'customers', component: CustomersComponent }
];
asad
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
