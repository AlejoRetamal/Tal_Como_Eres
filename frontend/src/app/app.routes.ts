import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { UsersComponent } from './components/users/users.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'users', component: UsersComponent },
];