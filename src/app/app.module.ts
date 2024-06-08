import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MenubarModule } from 'primeng/menubar';
import { DialogModule } from 'primeng/dialog';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { BookingsCreateComponent } from './pages/bookings/bookings-create/bookings-create.component';
import { BookingsDetailsComponent } from './pages/bookings/bookings-details/bookings-details.component';
import { TableModule } from 'primeng/table';
import { RoomBookingsDetailsComponent } from './pages/bookings/room-bookings-details/room-bookings-details.component';
import { CardModule } from 'primeng/card';
import { HttpClientModule } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    BookingsComponent,
    BookingsCreateComponent,
    BookingsDetailsComponent,
    RoomBookingsDetailsComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ButtonModule,
    FormsModule,
    CalendarModule,
    InputTextModule,
    MenubarModule,
    DialogModule,
    TableModule,
    CardModule,
    HttpClientModule,
    DropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
