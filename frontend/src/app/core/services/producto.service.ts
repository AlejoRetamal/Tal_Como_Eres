import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Producto {
  id:           number;
  nombre:       string;
  precio:       number;
  imagen:       string | null;
  categoria:    string;
  categoria_id: number;
  descripcion:  string;
}

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private apiUrl = 'http://localhost:3000/api/productos';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }
  
  getByCategoria(categoria_id: number): Observable<Producto[]> {
  return this.http.get<Producto[]>(`${this.apiUrl}/categoria/${categoria_id}`);
  }

  getById(id: number): Observable<Producto> {
  return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }
}