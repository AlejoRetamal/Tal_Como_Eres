import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { CarritoService, ItemCarrito } from '../../core/services/carrito.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  constructor(public carritoService: CarritoService) {}

  formatPrecio(precio: number | string): string {
    return Number(precio).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
  }

  eliminar(productoId: number) {
    this.carritoService.eliminar(productoId);
  }

  vaciar() {
    this.carritoService.vaciar();
  }
}