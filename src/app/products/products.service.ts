import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'https://68d39c53214be68f8c667a49.mockapi.io/products';

  constructor(
    private http: HttpClient
  ) { }

  // Obtener todos los productos
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Obtener info de un producto
  getProductById(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Agregar un producto nuevo
  addProduct(product: any) {
    return this.http.post(this.apiUrl, product);
  }

  // Eliminar un producto
  deleteProduct(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Actualizar un producto
  updateProduct(id: string, product: any) {
    return this.http.put(`${this.apiUrl}/${id}`, product);
  }
}
