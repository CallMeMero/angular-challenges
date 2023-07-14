import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wrapFn',
  standalone: true,
})
export class WrapFnPipe implements PipeTransform {
  transform<ARG1, R>(value: (args: ARG1) => R, args: ARG1): R;
  transform<ARG1, ARG2, R>(
    value: (arg1: ARG1, arg2: ARG2) => R,
    arg1: ARG1,
    arg2: ARG2
  ): R;

  transform<R>(value: (...args: unknown[]) => R, ...args: unknown[]): R {
    return value(...args);
  }
}
