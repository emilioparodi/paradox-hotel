import {ChangeDetectionStrategy, Component} from '@angular/core';
import {GameComponent} from './components/game/game';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [GameComponent],
  template: `<app-game></app-game>`,
  styles: [`
    :host {
      display: block;
      height: 100vh;
    }
  `]
})
export class App {}
