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
  // Usuario logueado
  loggedUser: any;
  // Lista de productos
  listProducts: any[] = [];
  filteredlistProducts: any[] = [];
  // Variable para el buscador
  searchTerm: string = '';

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private authService: AuthService,
    private productsService: ProductsService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.getLoggedUser();
    this.getListCars();
  }

  // Obtener usuario logueado
  async getLoggedUser() {
    const session = await this.authService.getUserSession();
    this.loggedUser = session;
    console.log('loggedUser', this.loggedUser)
  }

  // Filtrar la lista de productos (Nombre)
  filterProducts() {
    const term = this.searchTerm.toLowerCase();
    this.filteredlistProducts = this.listProducts.filter(product =>
      product.name.toLowerCase().includes(term)
    );
  }

  // Obtener la lista de productos 
  getListCars() {
    this.productsService.getProducts().subscribe({
      next: (data) => {
        this.listProducts = data;
        this.filteredlistProducts = [...this.listProducts];
        console.log('listProducts', this.listProducts)
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }

  // Añadir producto al carrito
  async addToCart(product: any) {
    // Validar si hay usuario logueado
    if (!this.loggedUser) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'No hay usuario logueado',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const userId = this.loggedUser.idUser || 0;

    // Obtener el carrito del usuario
    this.cartService.getCart(userId).subscribe(async (cartItems) => {

      // Convertir productId a string para evitar duplicados
      const productId = product.id.toString();

      // Buscar si el producto ya está en el carrito
      const existingItem = cartItems.find(item => item.productId.toString() === productId);

      if (existingItem) {
        // Si existe, actualizamos la cantidad 
        const newQuantity = (existingItem.quantity || 1) + 1;
        this.cartService.updateCartQuantity(existingItem.id!, newQuantity).subscribe(() => {
          this.showCart();
        });
      } else {
        // Si no existe, agregamos un nuevo item
        const cartItem: CartItem = {
          userId,
          productId,
          quantity: 1
        };

        console.log('cartItem', cartItem)

        this.cartService.addToCart(cartItem).subscribe(() => {
          this.showCart();
        });
      }
    });
  }

  // Ir al carrito
  showCart() {
    this.router.navigate(['/cart']);
  }

  // Cerrar sesión
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