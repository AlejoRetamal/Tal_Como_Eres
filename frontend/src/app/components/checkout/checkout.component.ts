import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { CarritoService } from '../../core/services/carrito.service';
import { OrdenService, Orden } from '../../core/services/orden.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarComponent],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  form = {
    nombre:    '',
    apellido:  '',
    email:     '',
    telefono:  '',
    domicilio: '',
    ciudad:    '',
  };

  ordenCreada: Orden | null = null;
  ordenCreadaId: number | null = null;  // ← nueva variable
  cargando = false;
  error = '';
  comprobante: File | null = null;
  subiendoComprobante = false;
  comprobanteSubido = false;

  total = computed(() => this.carritoService.total());
  items = computed(() => this.carritoService.itemsCarrito());

  readonly alias = 'talcomoeres.mp';

  constructor(
    private carritoService: CarritoService,
    private ordenService: OrdenService,
    private router: Router,
  ) {}

  confirmar() {
    if (!this.form.nombre || !this.form.apellido || !this.form.email ||
        !this.form.telefono || !this.form.domicilio || !this.form.ciudad) {
      this.error = 'Por favor completá todos los campos.';
      return;
    }

    this.cargando = true;
    this.error = '';

    this.ordenService.create(this.form, this.items(), this.total()).subscribe({
      next: (orden) => {
        this.ordenCreada = orden;
        this.ordenCreadaId = orden.id;  // ← guardá el id por separado
        this.carritoService.vaciar();
        this.cargando = false;
      },
      error: () => {
        this.error = 'Hubo un error al procesar tu orden. Intentá de nuevo.';
        this.cargando = false;
      }
    });
  }

  seleccionarArchivo(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.comprobante = input.files[0];
    }
  }

  subirComprobante(ordenId: number) {
    if (!this.comprobante) return;
    this.subiendoComprobante = true;

    this.ordenService.subirComprobante(ordenId, this.comprobante).subscribe({
      next: () => {
        this.comprobanteSubido = true;
        this.subiendoComprobante = false;
      },
      error: () => {
        this.subiendoComprobante = false;
      }
    });
  }

  formatPrecio(precio: number | string): string {
    return Number(precio).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
  }
}