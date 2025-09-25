import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from './cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'https://68d39c53214be68f8c667a49.mockapi.io/car';

  constructor(private http: HttpClient) { }

  // Obtener carrito de un usuario
  getCart(userId: number): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.apiUrl}?userId=${userId}`);
  }

  // Agregar producto al carrito
  addToCart(item: CartItem): Observable<CartItem> {
    return this.http.post<CartItem>(`${this.apiUrl}`, item);
  }

  // Actualizar cantidad de un producto
  updateCartQuantity(id: number | string, quantity: number): Observable<CartItem> {
    return this.http.put<CartItem>(`${this.apiUrl}/${id.toString()}`, { quantity });
  }

  // Eliminar un producto
  removeFromCart(itemId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove/${itemId}`);
  }

  // Vaciar carrito de un usuario
  clearCart(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/clear/${userId}`);
  }
}
