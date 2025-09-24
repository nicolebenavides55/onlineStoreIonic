import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = 'https://68d39c53214be68f8c667a49.mockapi.io/products';

  cards: any[] = [
    {
      "name": "HOLAA",
      "brand": "Honda",
      "model": "EX",
      "year": 2022,
      "price": "22000",
      "description": "Honda Civic EX con tecnología avanzada y diseño deportivo.",
      "image": "https://acnews.blob.core.windows.net/imgnews/medium/NAZ_693afb43fb074554978be71fa7132633.webp",
      "color": "Rojo",
      "mileage": 15000,
      "fuelType": "Gasolina",
      "id": "1"
    },
    {
      "name": "Corolla",
      "brand": "Toyota",
      "model": "LE",
      "year": 2021,
      "price": "20000",
      "description": "Toyota Corolla LE, confiable y eficiente para el uso diario.",
      "image": "https://cdn.motor1.com/images/mgl/8Xq1P/s3/2021-toyota-corolla-le.jpg",
      "color": "Blanco",
      "mileage": 12000,
      "fuelType": "Gasolina",
      "id": "2"
    },
    {
      "name": "Model 3",
      "brand": "Tesla",
      "model": "Standard Range Plus",
      "year": 2023,
      "price": "39990",
      "description": "Tesla Model 3 eléctrico, innovador y con autonomía extendida.",
      "image": "https://cdn.motor1.com/images/mgl/qk1L1/s3/tesla-model-3.jpg",
      "color": "Negro",
      "mileage": 5000,
      "fuelType": "Eléctrico",
      "id": "3"
    },
    {
      "name": "Mustang",
      "brand": "Ford",
      "model": "GT",
      "year": 2022,
      "price": "45000",
      "description": "Ford Mustang GT, icónico muscle car con gran potencia.",
      "image": "https://cdn.motor1.com/images/mgl/6z1yL/s3/ford-mustang-gt.jpg",
      "color": "Azul",
      "mileage": 8000,
      "fuelType": "Gasolina",
      "id": "4"
    },
    {
      "name": "Camry",
      "brand": "Toyota",
      "model": "XSE",
      "year": 2023,
      "price": "28000",
      "description": "Toyota Camry XSE, cómodo, seguro y eficiente en consumo.",
      "image": "https://cdn.motor1.com/images/mgl/7e9pG/s3/2023-toyota-camry-xse.jpg",
      "color": "Gris",
      "mileage": 10000,
      "fuelType": "Gasolina",
      "id": "5"
    },
    {
      "name": "CX-5",
      "brand": "Mazda",
      "model": "Touring",
      "year": 2021,
      "price": "26000",
      "description": "Mazda CX-5 Touring, SUV elegante y con gran desempeño.",
      "image": "https://cdn.motor1.com/images/mgl/JQbKX/s3/mazda-cx-5.jpg",
      "color": "Blanco",
      "mileage": 18000,
      "fuelType": "Gasolina",
      "id": "6"
    },
    {
      "name": "Accord",
      "brand": "Honda",
      "model": "Sport",
      "year": 2022,
      "price": "31000",
      "description": "Honda Accord Sport, elegante sedán con tecnología avanzada.",
      "image": "https://cdn.motor1.com/images/mgl/9R1Nn/s3/honda-accord-sport.jpg",
      "color": "Negro",
      "mileage": 7000,
      "fuelType": "Gasolina",
      "id": "7"
    }
  ]

  constructor(
    private http: HttpClient
  ) { }

  // Devuelve un Observable para que el componente haga subscribe
  loadProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
    // return of(this.cards);
  }
}
