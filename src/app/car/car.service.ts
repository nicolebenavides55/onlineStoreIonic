import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = 'https://68d39c53214be68f8c667a49.mockapi.io/products';

  constructor(private http: HttpClient) {}

  // Devuelve un Observable para que el componente haga subscribe
  loadProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
