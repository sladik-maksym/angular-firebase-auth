import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appButtonHoverEffect]',
  standalone: true,
})
export class ButtonHoverEffectDirective {
  @Input() appButtonHoverEffect: string = '1';
  @Input() appDefaultButtonHoverEffect: string = '1';

  constructor(private element: ElementRef<HTMLButtonElement>) {}

  ngAfterViewInit() {
    this.changeOpacity(this.appDefaultButtonHoverEffect);
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.changeOpacity(this.appButtonHoverEffect);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.changeOpacity(this.appDefaultButtonHoverEffect);
  }

  changeOpacity(opacity: string) {
    this.element.nativeElement.style.opacity = opacity;
  }
}
