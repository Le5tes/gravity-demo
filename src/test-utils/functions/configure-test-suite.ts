import { ComponentFixture, getTestBed, TestBed, async } from '@angular/core/testing';
import { cleanStyles } from './clean-styles';

export function configureTestSuite(configureAction?: () => void) {
    const testBedApi: any = getTestBed();
    const originReset = TestBed.resetTestingModule;

    before(() => {
        TestBed.resetTestingModule();
        TestBed.resetTestingModule = () => TestBed;
    });

    if (configureAction) {
        before(async(() => {
            configureAction();
            TestBed.compileComponents();
        }));
    }

    afterEach(() => {
        testBedApi._activeFixtures.forEach((fixture: ComponentFixture<any>) => fixture.destroy());
        testBedApi._instantiated = false;
        cleanStyles();
    });

    after(() => {
        TestBed.resetTestingModule = originReset;
        TestBed.resetTestingModule();
    });
}
