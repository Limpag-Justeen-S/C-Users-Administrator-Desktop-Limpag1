import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ProductsComponent } from './products/products';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProductsComponent]
})
export class App {}