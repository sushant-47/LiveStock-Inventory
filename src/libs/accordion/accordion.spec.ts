import { Component, DebugElement } from '@angular/core';
import { CgAccordionModule } from './accordion.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CgAccordion } from './accordion/accordion';
import { CgAccordionItem } from './accordion-item/accordion-item';
import { CgAccordionItemContent } from './accordion-item-content/accordion-item-content';
import { CgAccordionItemHeader } from './accordion-item-header/accordion-item-header';

@Component({
    selector: 'cg-test-host',
    imports: [CgAccordionModule],
    template: `<div>
        <cg-accordion [multi]="multi">
            <cg-accordion-item
                #infoItem="cdkAccordionItem"
                [isBasic]="isBasic"
                [expanded]="true"
                [disabled]="true"
            >
                <cg-accordion-item-content></cg-accordion-item-content>
            </cg-accordion-item>
            <cg-accordion-item
                #basicInfoItem="cdkAccordionItem"
                [expanded]="true"
                [disabled]="false"
            >
                <cg-accordion-item-header></cg-accordion-item-header>
                <cg-accordion-item-content></cg-accordion-item-content>
            </cg-accordion-item>
        </cg-accordion>
    </div>`,
})
class TestHost {
    multi: boolean = false;
    isBasic: boolean = false;

    setMulti(multi: boolean): void {
        this.multi = multi;
    }

    setBasic(isBasic: boolean): void {
        this.isBasic = isBasic;
    }
}

describe('Accordion', () => {
    let fixture: ComponentFixture<TestHost>;
    let hostDe: DebugElement;
    let comp: TestHost;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestHost],
        });
        fixture = TestBed.createComponent(TestHost);
        hostDe = fixture.debugElement;
        comp = hostDe.componentInstance;
    });

    it('should be defined', () => {
        expect(comp).toBeDefined();
        // expect(fixture.componentInstance === comp).toEqual(true);
    });

    // TODO: move to individual component spec files
    describe('CgAccordion', () => {
        let accordionDe: DebugElement;
        let accordion: CgAccordion;

        beforeEach(() => {
            accordionDe = hostDe.query(By.directive(CgAccordion));
            accordion = accordionDe.componentInstance;
        });

        it('should have id', () => {
            expect(accordion.id).toMatch(/^(cdk-accordion-\d+)$/);
        });

        it('should have host class', () => {
            expect(accordionDe.classes).toHaveProperty('cg-accordion');
        });
    });

    describe('CgAccordionItem', () => {
        let accordionItemDe: DebugElement[];
        let basicAccordionItem: CgAccordionItem, accordionItem: CgAccordionItem;

        beforeEach(() => {
            accordionItemDe = hostDe.queryAll(By.directive(CgAccordionItem));
            basicAccordionItem = accordionItemDe[0].componentInstance;
            accordionItem = accordionItemDe[1].componentInstance;
        });

        it('should have 2 accordion items', () => {
            expect(accordionItemDe.length).toEqual(2);
        });

        it('should have id', async () => {
            await fixture.whenStable();
            expect(accordionItemDe[0].attributes['id']).toMatch(
                /^(cdk-accordion-(\d+)-item-(\d+))$/,
            );
        });

        it('should have host class', () => {
            expect(accordionItemDe[0].classes).toHaveProperty('cg-accordion-item');
        });

        it('should have expanded and disabled states', async () => {
            await fixture.whenStable();
            // if `multi` is `false`, last item is expanded
            expect(accordionItemDe[1].classes).toHaveProperty('expanded');
            expect(basicAccordionItem.disabled).toEqual(true);
            expect(accordionItem.disabled).toEqual(false);
        });

        it('should open/close accordion item', async () => {
            await fixture.whenStable();
            const itemHeaderDe = accordionItemDe[1].query(By.directive(CgAccordionItemHeader));

            // accordion item is expanded by default
            expect(accordionItemDe[1].classes).toHaveProperty('expanded');

            // collapse accordion item
            itemHeaderDe.triggerEventHandler('click');
            await fixture.whenStable();

            expect(accordionItemDe[1].classes).not.toHaveProperty('expanded');

            // expand accordion item
            itemHeaderDe.triggerEventHandler('click');
            await fixture.whenStable();

            expect(accordionItemDe[1].classes).toHaveProperty('expanded');
        });
    });

    describe('CgAccordionItemContent', () => {
        let accordionItemContentDe: DebugElement[];
        let accordionItemContent: CgAccordionItemContent;

        beforeEach(() => {
            accordionItemContentDe = hostDe.queryAll(By.directive(CgAccordionItemContent));
            accordionItemContent = accordionItemContentDe[0].componentInstance;
        });

        it('should have 2 accordion items', () => {
            expect(accordionItemContentDe.length).toEqual(2);
        });

        it('should have id', async () => {
            await fixture.whenStable();
            expect(accordionItemContentDe[0].attributes['id']).toMatch(
                /^(cdk-accordion-(\d+)-item-(\d+)-content)$/,
            );
        });

        it('should have host classes and attributes', () => {
            expect(accordionItemContentDe[0].classes).toHaveProperty('cg-accordion-item-body');
            expect(accordionItemContentDe[0].attributes).toHaveProperty('role', 'region');
        });
    });

    // TODO: accordion integration tests
    describe('#basic accordion item', () => {
        // it('item content should not have aria-labelledby attribute', async () => {
        //     await fixture.whenStable();
        //     expect(accordionItemContentDe[0].attributes).not.toHaveProperty('aria-labelledby');
        // });
        // it('should have conditional classes', async () => {
        //     await fixture.whenStable();
        //     expect(accordionItemDe[0].classes).toHaveProperty('basic-accordion');
        // });
        // it('should not have item header')
        // item header tests
    });

    describe('#accordion with multi', () => {});
});
