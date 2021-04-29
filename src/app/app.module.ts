
/* @angular */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// Angular Animations Module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './component/app/app.component';
import { FooterComponent } from './component/common/footer/footer.component';
import { HeaderComponent } from './component/common/header/header.component';
import { MainComponent } from './component/common/main/main.component';
import { LayoutComponent } from './component/common/layout/layout.component';
import { SidebarComponent } from './component/common/sidebar/sidebar.component';


/*
 NGX - BOOTSTRAP
 */
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AccordionModule } from 'ngx-bootstrap/accordion';

/*
 ng-bootstrap - DatePicker
 */
import {NgbModule, NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap';
import {NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { ClienteComponent } from './component/mantenimiento/cliente/cliente.component';
import { DetalleClienteComponent } from './component/mantenimiento/cliente/detalle-cliente/detalle-cliente.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MainComponent,
    LayoutComponent,
    SidebarComponent,
    ClienteComponent,
    DetalleClienteComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    TooltipModule.forRoot(),
    TimepickerModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    AccordionModule.forRoot()
  ],
  providers: [  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
