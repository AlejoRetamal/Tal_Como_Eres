import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItemCarrito } from './carrito.service';

export interface Orden {
  id:        number;
  nombre:    string;
  apellido:  string;
  email:     string;
  telefono:  string;
  domicilio: string;
  ciudad:    string;
  total:     number;
  estado:    string;
  created_at: string;
  items:     any[];
}

@Injectable({ providedIn: 'root' })
export class OrdenService {
  private apiUrl = 'http://localhost:3000/api/ordenes';

  constructor(private http: HttpClient) {}

  create(datos: any, items: ItemCarrito[], total: number): Observable<Orden> {
    return this.http.post<Orden>(this.apiUrl, {
      ...datos,
      total,
      items,
    });
  }

private adminToken = '';

setToken(token: string) {
  this.adminToken = token;
}

getHeaders() {
  return { 'x-admin-token': this.adminToken };
}

getAll(): Observable<Orden[]> {
  return this.http.get<Orden[]>(`${this.apiUrl}/admin`, {
    headers: this.getHeaders()
  });
}

updateEstado(id: number, estado: string): Observable<any> {
  return this.http.patch(`${this.apiUrl}/${id}/estado`, { estado }, {
    headers: this.getHeaders()
  });
}

subirComprobante(ordenId: number, archivo: File): Observable<any> {
  const formData = new FormData();
  formData.append('comprobante', archivo);
  return this.http.post(`${this.apiUrl}/${ordenId}/comprobante`, formData);
}
}