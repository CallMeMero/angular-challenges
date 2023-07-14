import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'simplePure',
  standalone: true,
})
export class SimplePurePipe implements PipeTransform {
  transform(name: string, index = 0): string {
    return `${name} - ${index}`;
  }
}
