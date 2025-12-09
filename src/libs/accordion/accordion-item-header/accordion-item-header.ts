import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from "@angular/core";
import { CgAccordionItem } from "../accordion-item/accordion-item";
import { Subject, takeUntil } from "rxjs";

@Component({
    selector: 'cg-accordion-item-header',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./accordion-item-header.scss'],
    exportAs: 'cgAccordionItemHeader',
    host: {
        'class': 'cg-accordion-item-header',
        '[id]': 'id',
        '[class.hide]': 'accordionItem.isBasic',
        '(click)': 'accordionItem.toggle()',
        '(keyup.enter)': 'accordionItem.toggle()',
        '(keyup.space)': 'accordionItem.toggle()',
        'role': 'button',
        'tabindex': '0',
        '[attr.aria-controls]': 'accordionItem.id + "-content"',
        '[attr.aria-expanded]': 'accordionItem.expanded',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CgAccordionItemHeader implements OnInit, OnDestroy {
    /** accordion item of this header */
    readonly accordionItem: CgAccordionItem = inject(CgAccordionItem);
    readonly id: string = `${this.accordionItem.id}-header`;

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
