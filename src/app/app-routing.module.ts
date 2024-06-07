import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: LoginComponent,
  },
  {
    path: 'booking', component: BookingsComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
