import { Directive, Input, inject } from '@angular/core';
import { CurrencyService } from './currency.service';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[currencyCode]',
  providers: [CurrencyService],
  standalone: true,
})
export class CurrencyCodeDirective {
  private currencyService = inject(CurrencyService);

  @Input() set currencyCode(code: string) {
    this.currencyService.changeCode(code);
  }
}
