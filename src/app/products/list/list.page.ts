import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { CarService } from 'src/app/car/car.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
  standalone: false,
})
export class ListPage implements OnInit {

  products = [
    { id: 1, name: 'Producto 1', description: 'Descripción del producto 1', price: 10.99, image: 'assets/product1.jpg' },
    { id: 2, name: 'Producto 2', description: 'Descripción del producto 2', price: 20.50, image: 'assets/product2.jpg' },
    { id: 3, name: 'Producto 3', description: 'Descripción del producto 3', price: 15.75, image: 'assets/product3.jpg' },
    { id: 4, name: 'Producto 4', description: 'Descripción del producto 4', price: 8.99, image: 'assets/product4.jpg' },
  ];

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private authService: AuthService,
    private carService: CarService,
  ) { }

  ngOnInit() {
    this.carService.loadProducts().subscribe({
      next: (data) => {
        console.log('🚗 Autos cargados:', data);
        this.products = data; // 👈 asigna al array para mostrar en la vista
      },
      error: (err) => {
        console.error('❌ Error al cargar autos', err);
      }
    });
  }

  async addToCart(product: any) {
    const alert = await this.alertCtrl.create({
      header: 'Éxito',
      message: `${product.name} ha sido añadido al carrito.`,
      buttons: ['OK'],
    });
    await alert.present();

    this.router.navigate(['/cart']);
  }

  addProduct() {
    this.router.navigate(['/add-product']);
  }

  async logout() {
    const isValid = await this.authService.logout();

    if (isValid) {
      const alert = await this.alertCtrl.create({
        header: 'Éxito',
        message: 'Sesión cerrada correctamente',
        buttons: ['OK']
      });
      await alert.present();
      this.router.navigate(['/login']);
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'No fue posible cerrar sesión',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}