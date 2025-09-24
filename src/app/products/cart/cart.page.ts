import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: false,
})
export class CartPage implements OnInit {

  // cart: any[] = [];
  total: number = 0;

  cart = [
    { id: 1, name: 'Producto 1', description: 'Descripción del producto 1', price: 10.99, image: 'assets/product1.jpg', quantity: 1 },
    { id: 2, name: 'Producto 2', description: 'Descripción del producto 2', price: 20.50, image: 'assets/product2.jpg', quantity: 1 },
    { id: 3, name: 'Producto 3', description: 'Descripción del producto 3', price: 15.75, image: 'assets/product3.jpg', quantity: 1 },
    { id: 4, name: 'Producto 4', description: 'Descripción del producto 4', price: 8.99, image: 'assets/product4.jpg', quantity: 1 },
  ];

  constructor(
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    // Cargar productos del carrito desde localStorage o Ionic Storage
    // this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.updateTotal();
  }

  updateTotal() {
    this.total = this.cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  }

  removeItem(index: number) {
    this.cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.updateTotal();
  }

  async checkout() {
    const alert = await this.alertCtrl.create({
      header: 'Éxito',
      message: 'Compra realizada correctamente',
      buttons: ['OK'],
    });
    await alert.present();

    // Vaciar carrito
    this.cart = [];
    localStorage.removeItem('cart');
    this.updateTotal();
  }

}