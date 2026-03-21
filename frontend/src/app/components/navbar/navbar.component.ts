import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarritoService } from '../../core/services/carrito.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isScrolled = false;

  cantidadTotal = computed(() => this.carritoService.cantidadTotal());

  constructor(private carritoService: CarritoService) {}

  onScroll() {
    this.isScrolled = window.scrollY > 20;
  }
}