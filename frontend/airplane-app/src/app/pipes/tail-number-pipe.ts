import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tailNumber',
  standalone: true,
})
export class TailNumberPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return value.charAt(0) + '-' + value.substring(1);
  }
}
