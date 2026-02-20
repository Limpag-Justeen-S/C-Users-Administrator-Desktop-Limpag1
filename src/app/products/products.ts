import { Component, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-products',
  templateUrl: './products.html',
  styleUrls: ['./products.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.app-products]': 'true'
  }
})
export class ProductsComponent {
  searchText = signal('');
  isNavOpen = signal(false);
  isCartOpen = signal(false);

  products: Product[] = [
    { name: 'Phone', price: 299.99, icon: '📱' },
    { name: 'Tablet', price: 399.99, icon: '💻' },
    { name: 'Keyboard', price: 49.99, icon: '⌨️' },
    { name: 'Headphones', price: 89.99, icon: '🎧' }
  ];

  cart = signal<Product[]>([]);

  filteredProducts = computed(() =>
    this.products.filter(p =>
      p.name.toLowerCase().includes(this.searchText().toLowerCase())
    )
  );

  cartCount = computed(() =>
    this.cart().reduce((sum, item) => sum + (item.qty || 0), 0)
  );

  cartTotal = computed(() =>
    this.cart().reduce((sum, item) => sum + item.price * (item.qty || 0), 0)
  );

  toggleNav() {
    this.isNavOpen.update(value => !value);
  }

  toggleCart() {
    this.isCartOpen.update(value => !value);
  }

  addToCart(product: Product) {
    this.cart.update(current => {
      const existing = current.find(item => item.name === product.name);
      if (existing) {
        return current.map(item =>
          item.name === product.name
            ? { ...item, qty: (item.qty || 0) + 1 }
            : item
        );
      }
      return [...current, { ...product, qty: 1 }];
    });
  }

  removeFromCart(productName: string) {
    this.cart.update(current =>
      current.filter(item => item.name !== productName)
    );
  }

  updateQuantity(productName: string, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(productName);
    } else {
      this.cart.update(current =>
        current.map(item =>
          item.name === productName
            ? { ...item, qty: quantity }
            : item
        )
      );
    }
  }

  showCart() {
    const currentCart = this.cart();
    if (!currentCart.length) {
      alert('Cart is empty');
      return;
    }
    const items = currentCart
      .map(i => `${i.name} x${i.qty} = $${(i.price * i.qty!).toFixed(2)}`)
      .join('\n');
    alert(`Cart Items:\n${items}\n\nTotal: $${this.cartTotal().toFixed(2)}`);
  }
}