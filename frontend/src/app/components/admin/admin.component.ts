import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { OrdenService, Orden } from '../../core/services/orden.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  ordenes: Orden[] = [];
  cargando = true;

  estados = ['pendiente', 'aprobado', 'finalizado'];

  constructor(private ordenService: OrdenService) {}

  ngOnInit() {
    this.ordenService.getAll().subscribe({
      next: (o) => {
        this.ordenes = o;
        this.cargando = false;
      },
      error: () => this.cargando = false
    });
  }

  cambiarEstado(orden: Orden, estado: string) {
    this.ordenService.updateEstado(orden.id, estado).subscribe(() => {
      orden.estado = estado;
    });
  }

  formatPrecio(precio: number | string): string {
    return Number(precio).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
  }

  formatFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-AR', {
      day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  }
}