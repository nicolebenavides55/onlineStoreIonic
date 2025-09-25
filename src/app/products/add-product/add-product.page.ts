import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ProductsService } from '../products.service'; // 👈 Ajusta la ruta según tu proyecto
import { Router } from '@angular/router';

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
  brand: string = '';
  model: string = '';
  year: number | null = null;
  color: string = '';
  mileage: number | null = null;
  fuelType: string = '';

  constructor(
    private alertCtrl: AlertController,
    private productsService: ProductsService,
    private router: Router,
  ) { }

  addProduct() {
    if (!this.name || !this.price || this.price <= 0) {
      this.showAlert('Error', 'Nombre y precio son obligatorios');
      return;
    }

    const product = {
      name: this.name,
      description: this.description,
      price: this.price,
      image: this.image,
      brand: this.brand,
      model: this.model,
      year: this.year,
      color: this.color,
      mileage: this.mileage,
      fuelType: this.fuelType
    };

    this.productsService.addProduct(product).subscribe({
      next: async (res) => {
        await this.showAlert('Éxito', 'Producto agregado correctamente a la API');

        // Limpiar formulario
        this.resetForm();

        this.router.navigate(['products/list']);
      },
      error: async (err) => {
        console.error('Error al agregar:', err);
        await this.showAlert('Error', 'No se pudo agregar el producto');
      }
    });
  }

  resetForm() {
    this.name = '';
    this.description = '';
    this.price = 0;
    this.image = '';
    this.brand = '';
    this.model = '';
    this.year = null;
    this.color = '';
    this.mileage = null;
    this.fuelType = '';
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  goBack() {
    this.router.navigate(['products/list']);
  }
}
