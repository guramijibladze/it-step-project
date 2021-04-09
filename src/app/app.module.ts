import { CustomersService } from './customers.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
/* font awsome */
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CustomersComponent } from './customers/customers.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TableComponent } from './customers/table/table.component';


@NgModule({
  declarations: [
    AppComponent,
    // MatSliderModule,
    FooterComponent,
    LoginComponent,
    SignUpComponent,
    CustomersComponent,
    TableComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    FontAwesomeModule,
    NgbModule
  ],
  providers: [CustomersService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(fas, far);
  }
 }
