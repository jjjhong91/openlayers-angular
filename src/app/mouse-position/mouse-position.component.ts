import { createStringXY, format, CoordinateFormat } from 'ol/coordinate';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ElementRef,
} from '@angular/core';
import Map from 'ol/Map';
import ControlMousePosition from 'ol/control/MousePosition';


@Component({
  selector: 'app-mouse-position',
  template: ``,
  styles: [`::ng-deep .ol-scale-line {
      position: relative;
  }
  ::ng-deep .ol-scale-line, ::ng-deep .ol-scale-line-inner {
      background-color: transparent;
      border-color: var(--text-color);
      color: var(--text-color);
      font-size: inherit;
      bottom: auto;
  }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MousePositionComponent implements OnInit {

  @Input()
  map!: Map;
  @Input()
  positionTemplate!: string;
  control!: ControlMousePosition;

  constructor(private element: ElementRef) {

  }

  ngOnInit() {

    let customFormat = function(template: string): CoordinateFormat {
      return (coordinate: number[] | undefined) => format(coordinate || [0, 0], template, 4);
    }

    this.control = new ControlMousePosition({
      className: 'mouseposition-control',
      coordinateFormat: customFormat(this.positionTemplate),
      target: this.element.nativeElement,
      undefinedHTML: undefined,
    });
    this.map.addControl(this.control);
  }
}
