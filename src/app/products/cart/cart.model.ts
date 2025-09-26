export interface CartItem {
  id?: number;         // lo genera MockAPI
  idUser: number;      // Usuario dueño del carrito
  productId: number;   // Id del producto original
  quantity: number;    // Cantidad en el carrito
}
