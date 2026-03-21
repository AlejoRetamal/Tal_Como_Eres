import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProductoService, Producto } from '../../core/services/producto.service';
import { CarritoService } from '../../core/services/carrito.service';

@Component({
  selector: 'app-producto-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css']
})
export class ProductoDetalleComponent implements OnInit {
  producto: Producto | null = null;
  cargando = true;
  agregado = false;

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private carritoService: CarritoService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);

      this.cargando = true;
      this.producto = null;
      this.agregado = false;

      this.productoService.getById(id).subscribe({
        next: (p) => {
          this.producto = p;
          this.cargando = false;
        },
        error: (err) => {
          console.error('Error:', err);
          this.cargando = false;
        }
      });
    });
  }

  agregarAlCarrito() {
    if (this.producto) {
      this.carritoService.agregar(this.producto); // ← esta línea faltaba
      this.agregado = true;
      setTimeout(() => this.agregado = false, 2000);
    }
  }

  formatPrecio(precio: number | string): string {
    return Number(precio).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
  }
}