import { Component, signal } from '@angular/core';
import { ALL_PIPES } from '../../../directives/src/lib/text-case-pipe';

@Component({
  selector: 'app-root',
  imports: [...ALL_PIPES],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('demo-application');
}
