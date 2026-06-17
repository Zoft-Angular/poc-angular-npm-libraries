import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TitleCasePipe } from 'directives';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TitleCasePipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('demo-application');
}
