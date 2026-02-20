import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add item to cart', () => {
    const product = component.products[0];
    component.addToCart(product);
    expect(component.cart().length).toBe(1);
  });

  it('should filter products by search text', () => {
    component.searchText.set('phone');
    expect(component.filteredProducts().length).toBe(1);
    expect(component.filteredProducts()[0].name).toBe('Phone');
  });

  it('should calculate cart count correctly', () => {
    component.addToCart(component.products[0]);
    component.addToCart(component.products[0]);
    expect(component.cartCount()).toBe(2);
  });

  it('should calculate cart total correctly', () => {
    component.addToCart(component.products[0]);
    const total = component.cartTotal();
    expect(total).toBe(299.99);
  });
});