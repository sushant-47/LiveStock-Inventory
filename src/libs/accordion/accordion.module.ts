import { NgModule } from "@angular/core";
import { CgAccordion } from "./accordion/accordion";
import { CgAccordionItem } from "./accordion-item/accordion-item";
import { CgAccordionItemHeader } from "./accordion-item-header/accordion-item-header";
import { CgAccordionItemContent } from "./accordion-item-content/accordion-item-content";

@NgModule({
    imports: [CgAccordion, CgAccordionItem, CgAccordionItemHeader, CgAccordionItemContent],
    exports: [CgAccordion, CgAccordionItem, CgAccordionItemHeader, CgAccordionItemContent],
})
export class CgAccordionModule {}
