import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from './cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'https://68d39c53214be68f8c667a49.mockapi.io/shoppingCart';

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
    return this.http.delete(`${this.apiUrl}/${itemId}`);
  }

  // Vaciar carrito de un usuario
  clearCart(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/clear/${userId}`);
  }
}


// [
//   {
//     "name": "Tesla Model S",
//     "price": 79999,
//     "description": "Un sedán eléctrico de lujo con tecnología avanzada y rendimiento excepcional.",
//     "image": "https://www.tesla.com/sites/default/files/modelsx-new/social/model-s-hero-social.jpg",
//     "id": "1"
//   },
//   {
//     "name": "BMW M3",
//     "price": 70900,
//     "description": "Un sedán deportivo con un motor potente y un manejo preciso.",
//     "image": "https://rosschile.com/wp-content/uploads/2025/01/WhatsApp-Image-2025-01-16-at-15.39.11-scaled.jpeg",
//     "id": "2"
//   },
//   {
//     "name": "Audi A8",
//     "price": 86900,
//     "description": "Un sedán de lujo con interiores de alta calidad y tecnología de punta.",
//     "image": "https://mediaservice.audi.com/media/fast/v3_xWTXWhbdRjG__31S5OcpOd0SZs09EBPTiyDbKftST-cuUgtomBd6Wa9GJL-TU7StOlJTE5qtQr1QujNhIFu2pt5IbtwU_Bi4JgMtwpeiIIXouxGvXNacSizjuHHKbwvPBfP87zvxfNc-U10t5uCM7NX_hz4u-eh0z8ixGZDiM5d0e21my_UO4QQCwSq67LiHF9tOJWBtJzOOJteRm40jo9b45OZ_PSCzOSfncxuZuxnLH_tjKzVIqLXl4pOIXq3heh-79BIhPvbzVpDNuX6sabTatTdVnXDUUenJ8pTclI6drnkg9KUVSplLXvakRPTM_ZEtjyZdZziVDmr-Ra3RKfvLo64lWKx3Ky73oRdclprXr2xWRM9tlu0bCm6Dh9j5HOGXyN2ithVBv8j_hiJoyTeIvEBiU_QM-iX0a-jf43-DSP-3MOYw1jGuIv5L-k50quIPIEOgjuEmiiXiAwQmSLaZugCSZfkMsmzJD30E6R2MQ9IpxHHCP6OegNNJXqemEWiTLKf5CjJp0gdJXUbcwnzYwLdhB5B8QjbqPOor6C5aJtot4g-YPAS8QbxL4kfkPgFowfjPqkIqTypAqmLpG5i2gRnCf6F9gTKNZR7hDtQJ1BPoBZQJepV1D20UTQLLYd2Eq1N9CzxL0guMnyb4QcM_4Pehd6HnmDkV4zzGB7Gpxg3SS2ROsDUMOOYPxB6H-UCyh3CfxDZpe80fXdJbKFrGDMMtklcJ6QS-Z4jd4g-T3SF2A6xzxjYZnCVwTcwz2CuYb6I-Q7mHqID0Yt4lYf3CTxOYJFAjWAvQZfgFkH_okLoMqGPUJZR3kT5lrBCeIjwNpE8kdeJXCR-jsRPDO2Q_JDhG-iPoj-HvsHIfYwR1Dnii8RfJhnC-ArjZ0I9hIboOkfYILxPZB-1G_VdYlvE9oh958fsbcfdqPrxWndcLzdfn88Xnqy3W05hVhbXGjXpOa30S9WSt5Ibmxm30itOtbLi5cZs20rLWmNF5sqy1nLSRbnuNGXulOe3p5AvjBcsyye4fpu8qh_-3EK9VT1ETx_K0y3PcZpVtyLdSs3JjWXT644nS9KTG06z5bNy4_2d-aWF_wFtWQy4tQMAAA?wid=1920",
//     "id": "3"
//   },
//   {
//     "name": "Mercedes-Benz S-Class",
//     "price": 109800,
//     "description": "El sedán insignia de Mercedes-Benz, conocido por su confort y tecnología avanzada.",
//     "image": "https://www.mercedes-benz.com.mx/content/dam/hq/passengercars/cars/s-class/s-class-saloon-wv223-pi/overview/exterior/09-2022/images/mercedes-benz-s-class-wv223-exterior-hotspot-3302x1858-09-2022.jpg/1740015980299.jpg?im=Crop,rect=(0,0,3302,1857);Resize=(1850,1040)",
//     "id": "4"
//   },
//   {
//     "name": "Porsche 911",
//     "price": 99900,
//     "description": "Un icono deportivo con un diseño atemporal y un rendimiento impresionante.",
//     "image": "https://www.topgear.com/sites/default/files/cars-car/image/2024/02/pcgb20_0589_fine.jpg",
//     "id": "5"
//   }
// ]
