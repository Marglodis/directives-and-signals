import { Directive, ElementRef, Input, input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]',
  standalone: false,
})
export class CustomLabelDirective implements OnInit {
  private htmlElement?: ElementRef<HTMLElement>;
  private _color: string = 'red';
  private _errors?: ValidationErrors | null;

  @Input()
  public set color(value: string) {
    this._color = value;
    this.setStyle();
  }

  @Input()
  public set errors(value: ValidationErrors | null | undefined) {
    this._errors = value;
    this.setErrorsMessage();
  }

  constructor(private elementRef: ElementRef<HTMLElement>) {
    console.log(elementRef);
    this.htmlElement = elementRef;
  }

  ngOnInit(): void {
    console.log('CustomLabelDirective - ngOnInit');
    this.setStyle();
  }

  setStyle(): void {
    if (this.htmlElement) {
      this.htmlElement.nativeElement.style.color = this._color;
    }
  }

  setErrorsMessage(): void {
    if (!this.htmlElement) return;

    if (!this._errors) {
      this.htmlElement.nativeElement.innerText = '';
      return;
    }

    const errors = Object.keys(this._errors);

    if (errors.includes('required')) {
      this.htmlElement.nativeElement.innerText = 'El campo es requerido';
      return;
    }

    if (errors.includes('minlength')) {
      this.htmlElement.nativeElement.innerText = `El campo debe tener al menos ${this._errors['minlength'].requiredLength} caracteres`;
      return;
    }

    if (errors.includes('email')) {
      this.htmlElement.nativeElement.innerText = 'El correo no es válido';
      return;
    }
  }
}
