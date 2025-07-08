import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, input, OnChanges } from '@angular/core';
import { IconName, icons } from './icons/icons';

@Component({
  selector: 'app-icon',
  imports: [CommonModule],
  template: '<ng-content></ng-content>',
  styles: [
    `
      :host {
        display: inline-block;
        align-content: center;
        width: 100%;
        height: 100%;
        fill: none;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent implements OnChanges {
  name = input.required<IconName>();
  size = input<number>(24);

  iconSvg = () => {
    const svg = icons[this.name()] as string;

    if (this.size() !== 24) {
      return svg.replace('<svg', `<svg width="${this.size()}" height="${this.size()}"`);
    }

    return svg;
  }
  
  constructor(private elementRef: ElementRef) {
  }
  
  ngOnChanges() {
    this.elementRef.nativeElement.innerHTML = this.iconSvg();
  }
}