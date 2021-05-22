import { Directive, forwardRef, Renderer2, ElementRef } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, DefaultValueAccessor } from '@angular/forms';

@Directive({
  selector: '.appUppercase',
  host: {
    // When the user updates the input
    '(input)': 'onInput($event.target.value)',
    '(blur)': 'onTouched()',
  },
  providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			// tslint:disable-next-line:no-forward-ref
			useExisting: forwardRef(() => UppercaseDirective),
			multi: true
		}
	]
})
export class UppercaseDirective extends DefaultValueAccessor {

  constructor(
    renderer: Renderer2,
    elementRef: ElementRef
  ) {
    super(renderer, elementRef, false);
  }

  writeValue(value: any): void {
    const transformed = this.transformValue(value);

    super.writeValue(transformed);
  }

  onInput(value: any): void {
    const transformed = this.transformValue(value);

    super.writeValue(transformed);
    this.onChange(transformed);
  }

  private transformValue(value: any): any {
    const result = value && typeof value === 'string'
      ? value.toLocaleUpperCase()
      : value;

    return result;
  }

}
