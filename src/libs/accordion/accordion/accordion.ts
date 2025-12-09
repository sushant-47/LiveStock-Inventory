import { CDK_ACCORDION, CdkAccordion } from "@angular/cdk/accordion";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { getId } from "../../utils/getId";

@Component({
    selector: 'cg-accordion',
    template: `<ng-content select="cg-accordion-item"></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'class': 'cg-accordion',
        '[id]': 'id',
    },
    exportAs: 'cdkAccordion',
    providers: [{ provide: CDK_ACCORDION, useExisting: CgAccordion }],
})
export class CgAccordion extends CdkAccordion {
    override readonly id: string = getId('cdk-accordion');
}
