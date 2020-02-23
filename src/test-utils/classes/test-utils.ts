import { AbstractControl } from '@angular/forms';
import { ComponentFixture } from '@angular/core/testing';

export class TestUtils {
    private fixture: ComponentFixture<{}>;
    private nativeElement: any;
    private componentInstance: any;

    static createUtils(fixture: ComponentFixture<{}>) {
        const instance = new TestUtils();
        instance.fixture = fixture;
        instance.nativeElement = fixture.nativeElement;
        instance.componentInstance = fixture.componentInstance;

        return instance;
    }

    getControl(fieldPath?: string): AbstractControl {
        const formGroup = this.componentInstance.form || this.componentInstance.formGroup;
        return fieldPath ? formGroup.get(fieldPath) : formGroup;
    }

    getErrorMessage(formControlName: string, errorMessageDataQa: string): string {
        this.simulateEvent('blur', formControlName);
        this.fixture.detectChanges();

        const errorElement = this.nativeElement.querySelector(`[data-qa='${errorMessageDataQa}']`);
        return errorElement && errorElement.textContent;
    }

    simulateEvent(eventName: any, formControlName: string): void {
        const event = document.createEvent('Events');
        const element = document.querySelector(`[formControlName='${formControlName}']`);

        event.initEvent(eventName, true, true);
        element.dispatchEvent(event);
    }

    pressButton(nativeElement: any, fixture: any, identifier: string): void {
        nativeElement.querySelector(identifier).click();
        fixture.detectChanges();
    }

    clickButton(cssString: string): void {
        this.element(cssString).click();
        this.fixture.detectChanges();
    }

    clickButtonQa(dataQa: string): void {
        this.elemByDataQa(dataQa).click();
        this.fixture.detectChanges();
    }

    clickRadioButton(dataQa: string, option: number): void {
        const selectedRadioButton = this.elemByDataQa(dataQa)
            .querySelectorAll('label')[option].querySelector('input');

        selectedRadioButton.click();

        this.fixture.detectChanges();
    }

    elemByDataQa(dataQa: string): any {
        return this.nativeElement.querySelector(byDataQa(dataQa));
    }

    elemByDataQaAll(dataQa: string): any[] {
        return this.nativeElement.querySelectorAll(byDataQa(dataQa));
    }

    element(cssString: string): any {
        return this.nativeElement.querySelector(cssString);
    }

    elements(cssString: string): any[] {
        return this.nativeElement.querySelectorAll(cssString);
    }
}

export function byDataQa(dataQa: string): string {
    return `[data-qa='${dataQa}']`;
}

export function simulateEvent(eventKey, element, value?) {
    const event = document.createEvent('Events');
    event.initEvent(eventKey, true, true);
    element.dispatchEvent(event);
}

export function simulateCustomEvent(name, element, payload) {
    const customEvent = new CustomEvent(name, {
        detail: payload
    });
    element.dispatchEvent(customEvent);
}
