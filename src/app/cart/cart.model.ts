export interface CartItem {
  id?: number;         // lo genera MockAPI
  userId: number;      // Usuario dueño del carrito
  productId: number;   // Id del producto original
  quantity: number;    // Cantidad en el carrito
}
