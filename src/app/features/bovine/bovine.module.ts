import { NgModule } from "@angular/core";
import { CowListComponent } from "./components/cow-list/cow-list";

@NgModule({
    imports: [
        CowListComponent,
    ],
    exports: [
        CowListComponent,
    ]
})
export class BovineModule {}
