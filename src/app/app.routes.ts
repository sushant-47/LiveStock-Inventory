import { Routes } from '@angular/router';
import { AddCowDialog } from './features/bovine/components/add-cow-dialog/add-cow-dialog';
import { CowListComponent } from './features/bovine/components/cow-list/cow-list';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: CowListComponent,
    },
    {
        path: 'add-cattle',
        component: CowListComponent,
    }
];
