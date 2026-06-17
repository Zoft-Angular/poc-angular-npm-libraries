import { Component, signal } from '@angular/core';
import { TextCasePipe } from '../../../directives/src/lib/text-case-pipe';

@Component({
  selector: 'app-root',
  imports: [TextCasePipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('demo-application');
}
