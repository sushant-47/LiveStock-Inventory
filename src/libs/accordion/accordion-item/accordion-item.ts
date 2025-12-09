import { CDK_ACCORDION, CdkAccordionItem } from "@angular/cdk/accordion";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { getId } from "../../utils/getId";

@Component({
    selector: 'cg-accordion-item',
    template: `
        <div class="cg-accordion-item__wrapper">
            <ng-content select="cg-accordion-item-header"></ng-content>
            <ng-content select="cg-accordion-item-content"></ng-content>
        </div>
    `,
    styleUrls: ['./accordion-item.scss'],
    providers: [
        { provide: CDK_ACCORDION, useValue: undefined },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'class': 'cg-accordion-item',
        '[id]': 'id',
        '[class.basic-accordion]': 'isBasic',
        '[class.expanded]': 'expanded',
    },
    exportAs: 'cdkAccordionItem',
})
export class CgAccordionItem extends CdkAccordionItem {
    /** Accordion item without any header. */
    @Input() isBasic: boolean = false;

    override readonly id: string = getId(`${this.accordion.id}-item`);
}
