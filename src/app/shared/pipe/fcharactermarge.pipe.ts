import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fcharactermarge',
})
export class FcharactermargePipe implements PipeTransform {
  transform(value: string): string {
    const firstLetters = value
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase();

    return firstLetters;
  }
}
