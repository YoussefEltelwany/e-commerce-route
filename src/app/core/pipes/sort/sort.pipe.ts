import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'sortProducts'
})
export class SortPipe implements PipeTransform {
  transform(products: any[], sortBy: string): any[] {
    if (!products || !sortBy) return products;

    switch (sortBy) {
      case 'price-asc':
        return [...products].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...products].sort((a, b) => b.price - a.price);
      case 'name-asc':
        return [...products].sort((a, b) => a.title.localeCompare(b.title));
      default:
        return products;
    }
  }
}
