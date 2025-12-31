import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CowListComponent } from './cow-list';
import { provideRouter } from '@angular/router';
import { routes } from '../../../../app.routes';

describe('CowList', () => {
    let fixture: ComponentFixture<CowListComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CowListComponent],
            providers: [provideRouter(routes)],
        });

        fixture = TestBed.createComponent(CowListComponent);
        jest.spyOn(fixture.componentInstance['_dialogService'], 'open');
    });

    it('should be defined', () => {
        expect(fixture.componentInstance).toBeDefined();
    });
});
