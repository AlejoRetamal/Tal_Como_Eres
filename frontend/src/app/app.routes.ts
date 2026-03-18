import { Routes } from '@angular/router';
import { UsersComponent } from './features/users/users.component';

export const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: '', redirectTo: 'users', pathMatch: 'full' },
];