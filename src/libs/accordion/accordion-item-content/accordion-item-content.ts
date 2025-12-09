import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";
import { Subject, takeUntil } from "rxjs";
import { CgAccordionItem } from "../accordion-item/accordion-item";

@Component({
    selector: 'cg-accordion-item-content',
    imports: [
        NgTemplateOutlet,
    ],
    template: `
        <ng-template #content>
            <ng-content></ng-content>
        </ng-template>
        @if (accordionItem.expanded) {
            <ng-container *ngTemplateOutlet="content"></ng-container>
        }
    `,
    styleUrls: ['./accordion-item-content.scss'],
    exportAs: 'cgAccordionItemContent',
    host: {
        'class': 'cg-accordion-item-body',
        '[id]': 'id',
        'role': 'region',
        '[attr.aria-labelledby]': 'accordionItem.isBasic ? null : accordionItem.id + "-header"',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CgAccordionItemContent {
    /** accordion item */
    readonly accordionItem: CgAccordionItem = inject(CgAccordionItem);
    readonly id: string = `${this.accordionItem.id}-content`;

    private _cdr = inject(ChangeDetectorRef);
    private _destroy$: Subject<void> = new Subject();

    ngOnInit(): void {
        this.accordionItem.expandedChange.pipe(
            takeUntil(this._destroy$)
        ).subscribe({
            next: () => {
                this._cdr.markForCheck();
            }
        });
    }

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }
}
