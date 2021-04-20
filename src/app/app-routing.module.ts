import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { CustomersComponent } from './customers/customers.component';
 import { DetailInfoComponent } from './detail-info/detail-info.component';

const routes: Routes = [
  // { path: '', redirectTo: "**", pathMatch: 'full'},
  { path: 'register', component: SignUpComponent },
  { path: '', component: LoginComponent },
  { path: 'customers', component: CustomersComponent },
  //{ path: 'detailInfo/:id', component: DetailInfoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
