import { Component, signal } from '@angular/core';
import { BovineModule } from './features/bovine/bovine.module';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    imports: [
        BovineModule,
        RouterOutlet,
    ],
    templateUrl: './app.html',
    styleUrl: './app.scss'
})
export class App {
    // protected readonly title = signal('catalog');
}
