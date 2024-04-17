import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  standalone: true
})
export class SortPipe implements PipeTransform {

  transform(array: any[], sortBy: string, order: 'asc' | 'desc' = 'asc'): any[] {
    if (!Array.isArray(array) || !sortBy) {
      return array;
    }

    const sortedArray = array.slice().sort((a, b) => {
      const valueA = a[sortBy];
      const valueB = b[sortBy];

      if (valueA === valueB) {
        return 0;
      }

      return order === 'asc' ? (valueA > valueB ? 1 : -1) : (valueA < valueB ? 1 : -1);
    });

    return sortedArray;
  }

}
