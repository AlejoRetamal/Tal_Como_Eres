import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProductoService, Producto } from '../../core/services/producto.service';
import { CategoriaService, Categoria } from '../../core/services/categoria.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  categoria: Categoria | null = null;
  categoria_id!: number;

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.categoria_id = +params['categoria_id'];
      this.productoService.getByCategoria(this.categoria_id).subscribe(p => this.productos = p);
      this.categoriaService.getById(this.categoria_id).subscribe(c => this.categoria = c);
    });
  }

  formatPrecio(precio: number): string {
    return precio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
  }
}