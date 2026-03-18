import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProductoService, Producto } from '../../core/services/producto.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  productos: Producto[] = [];

  categories = [
    { name: 'Vestidos',   count: 42, gradient: 'linear-gradient(135deg, #D4C9B8 0%, #B8AA98 100%)' },
    { name: 'Tops',       count: 38, gradient: 'linear-gradient(135deg, #C8C0B4 0%, #A89D8E 100%)' },
    { name: 'Pantalones', count: 27, gradient: 'linear-gradient(135deg, #BFB8AE 0%, #9E9488 100%)' },
    { name: 'Accesorios', count: 19, gradient: 'linear-gradient(135deg, #D0C8BC 0%, #B0A496 100%)' },
  ];

  tickerItems = [
    'Envíos a todo el país',
    'Nueva colección disponible',
    'Materiales sustentables',
    'Tallas de la XS a la XXL',
    'Devoluciones sin cargo',
  ];

  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    this.productoService.getAll().subscribe(p => this.productos = p);
  }

  formatPrecio(precio: number): string {
    return precio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
  }
}