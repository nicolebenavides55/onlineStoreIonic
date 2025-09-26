import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CartService } from './cart.service';
import { CartItem } from './cart.model';
import { AuthService } from 'src/app/auth/auth.service';
import { ProductsService } from '../products/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: false,
})
export class CartPage implements OnInit {
  cart: CartItem[] = [];
  productsInCart: any[] = []; // Array con datos completos de cada producto
  userId: number = 0;
  total: number = 0;

  constructor(
    private alertCtrl: AlertController,
    private cartService: CartService,
    private authService: AuthService,
    private productsService: ProductsService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loadCart();
  }

  async loadCart() {
    const session = await this.authService.getUserSession();
    if (!session) return;

    this.userId = session?.idUser || 0;

    // Obtener items del carrito
    this.cartService.getCart(this.userId).subscribe(async items => {
      this.cart = items;
      this.productsInCart = [];

      // Por cada item, buscar el producto completo
      for (const item of items) {
        const product = await this.productsService.getProductById(item.productId).toPromise();
        if (product) {
          this.productsInCart.push({
            ...item,
            productName: product.name,
            price: product.price,
            image: product.image,
            description: product.description
          });
        } else {
          console.warn(`Producto con ID ${item.productId} no encontrado`);
        }
      }

      this.updateTotal();
    });
  }

  // Llamado al cambiar la cantidad en el input
  onQuantityChange(item: any, event: any) {
    const value = parseInt(event.detail.value, 10);
    if (isNaN(value) || value < 1) {
      item.quantity = 1;
    } else {
      item.quantity = value;
    }

    this.updateQuantity(item.id, value);
    this.updateTotal();
  }

  // Calcular total
  updateTotal() {
    this.total = this.productsInCart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }

  removeItem(item: CartItem) {
    if (!item.id) return;

    this.cartService.removeFromCart(item.id).subscribe({
      next: () => this.loadCart(),
      error: (err) => console.error('Error al eliminar:', err)
    });
  }

  updateQuantity(idCart: number, quantity: number) {
    this.cartService.updateCartQuantity(idCart, quantity).subscribe(() => {
      this.loadCart();
    });
  }

  async checkout() {
    const alert = await this.alertCtrl.create({
      header: 'Éxito',
      message: 'Compra realizada correctamente',
      buttons: ['OK'],
    });
    await alert.present();

    this.cartService.clearCart(this.userId).subscribe(() => {
      this.cart = [];
      this.updateTotal();
    });
  }

  return() {
    this.router.navigate(['/products/list']);
  }
}
