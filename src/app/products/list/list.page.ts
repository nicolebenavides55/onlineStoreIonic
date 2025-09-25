import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { ProductsService } from 'src/app/products/products.service';
import { CartService } from '../cart/cart.service';
import { CartItem } from '../cart/cart.model';

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
    private productsService: ProductsService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.productsService.getProducts().subscribe({
      next: (data) => {
        console.log('Autos cargados:', data);
        this.products = data; // 👈 asigna al array para mostrar en la vista
      },
      error: (err) => {
        console.error('❌ Error al cargar autos', err);
      }
    });
  }

  async addToCart(product: any) {
    const session = await this.authService.getUserSession();
    if (!session) {
      console.error('No hay usuario logueado');
      return;
    }

    const userId = session.idUser || 0 // MockAPI usa string para ID

    // Primero obtenemos el carrito del usuario
    this.cartService.getCart(userId).subscribe(async (cartItems) => {

      // Convertir productId a string para evitar duplicados
      const productId = product.id.toString();

      // Buscar si el producto ya está en el carrito
      const existingItem = cartItems.find(item => item.productId.toString() === productId);

      if (existingItem) {
        // Si existe, actualizamos la cantidad usando PATCH
        const newQuantity = (existingItem.quantity || 1) + 1;
        this.cartService.updateCartQuantity(existingItem.id!, newQuantity)
          .subscribe(() => {
            console.log(`Cantidad del producto "${product.name}" actualizada a ${newQuantity}`);

            this.showCart();
          });

      } else {
        // Si no existe, agregamos un nuevo item
        const cartItem: CartItem = {
          userId,
          productId,
          quantity: 1
        };

        this.cartService.addToCart(cartItem)
          .subscribe(() => {
            console.log(`Producto "${product.name}" agregado al carrito`);
            this.showCart();
          });
      }
    });
  }

  showCart() {
    this.router.navigate(['/cart']);
  }

  addProduct() {
    // this.router.navigate(['/cart']);
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