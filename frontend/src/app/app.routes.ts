import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { UsersComponent } from './components/users/users.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ProductoDetalleComponent } from './components/producto-detalle/producto-detalle.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { adminGuard } from './core/guards/admin.guard';
import { AdminComponent } from './components/admin/admin.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'usuarios', component: UsersComponent },
  { path: 'productos/:categoria_id', component: ProductosComponent },
  { path: 'producto/:id', component: ProductoDetalleComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'admin', component: AdminComponent, canActivate: [adminGuard] },
];