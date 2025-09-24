import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
  standalone: false,
})
export class AddProductPage {

  // Campos del producto
  name: string = '';
  description: string = '';
  price: number = 0;
  image: string = '';
  deliveryTime: string = '';
  paymentMethod: string = '';
  discount: number = 0;
  additionalInfo: string = '';
  quantity: number = 1;

  constructor(
    private alertCtrl: AlertController
  ) {}

  addProduct() {
    const product = {
      id: new Date().getTime(), // ID único
      name: this.name,
      description: this.description,
      price: this.price,
      image: this.image,
      deliveryTime: this.deliveryTime,
      paymentMethod: this.paymentMethod,
      discount: this.discount,
      additionalInfo: this.additionalInfo,
      quantity: this.quantity
    };

    // Guardar en carrito (localStorage)
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));

    this.showAlert('Éxito', 'Producto agregado al carrito correctamente');

    // Limpiar campos
    this.name = '';
    this.description = '';
    this.price = 0;
    this.image = '';
    this.deliveryTime = '';
    this.paymentMethod = '';
    this.discount = 0;
    this.additionalInfo = '';
    this.quantity = 1;
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}