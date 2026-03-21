import { Injectable, signal, computed } from '@angular/core';
import { Producto } from './producto.service';

export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private items = signal<ItemCarrito[]>([]);

  readonly itemsCarrito = this.items.asReadonly();

  readonly total = computed(() =>
    this.items().reduce((acc, item) =>
      acc + (Number(item.producto.precio) * item.cantidad), 0)
  );

  readonly cantidadTotal = computed(() =>
    this.items().reduce((acc, item) => acc + item.cantidad, 0)
  );

  agregar(producto: Producto) {
    const actual = this.items();
    const existe = actual.find(i => i.producto.id === producto.id);

    if (existe) {
      this.items.set(actual.map(i =>
        i.producto.id === producto.id
          ? { ...i, cantidad: i.cantidad + 1 }
          : i
      ));
    } else {
      this.items.set([...actual, { producto, cantidad: 1 }]);
    }
  }

  eliminar(productoId: number) {
    this.items.set(this.items().filter(i => i.producto.id !== productoId));
  }

  vaciar() {
    this.items.set([]);
  }
}