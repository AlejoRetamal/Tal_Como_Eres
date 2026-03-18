import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProductoService, Producto } from '../../core/services/producto.service';
import { CategoriaService, Categoria } from '../../core/services/categoria.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  productos: Producto[] = [];
  categorias: Categoria[] = [];

  constructor(private productoService: ProductoService, private categoriaService: CategoriaService) {}


  ngOnInit() {
    this.productoService.getAll().subscribe(p => this.productos = p);
    this.categoriaService.getAll().subscribe(c => this.categorias = c);
  }

  formatPrecio(precio: number): string {
    return precio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
  }
}