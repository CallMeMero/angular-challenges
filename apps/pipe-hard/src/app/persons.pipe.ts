import { Pipe, PipeTransform } from '@angular/core';
import { PersonUtils } from './person.utils';

type FunctionNames = keyof typeof PersonUtils;
type Params<T extends FunctionNames> = Parameters<(typeof PersonUtils)[T]>;

type ARG1<U> = U extends [infer First, ...unknown[]] ? First : never;
type ARG2<U> = U extends [unknown, ...infer Rest] ? Rest : never;

@Pipe({
  name: 'persons',
  standalone: true,
})
export class PersonsPipe implements PipeTransform {
  transform<T extends FunctionNames>(
    arg1: ARG1<Params<T>>,
    fnName: T,
    ...args: ARG2<Params<T>>
  ): ReturnType<(typeof PersonUtils)[T]> {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return (PersonUtils[fnName] as Function)(arg1, ...args);
  }
}
