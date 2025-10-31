import { Component, signal } from '@angular/core';
import { BovineModule } from './features/bovine/bovine.module';

@Component({
    selector: 'app-root',
    imports: [
        BovineModule,
    ],
    templateUrl: './app.html',
    styleUrl: './app.scss'
})
export class App {
    // protected readonly title = signal('catalog');
}
