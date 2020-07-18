import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceChartsComponent } from './performance-charts.component';
import { TestUtils } from 'src/test-utils/classes/test-utils';
import { configureTestSuite } from 'src/test-utils/functions/configure-test-suite';

describe('PerformanceChartsComponent', () => {
  let component: PerformanceChartsComponent;
  let fixture: ComponentFixture<PerformanceChartsComponent>;
  let testUtils: TestUtils;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformanceChartsComponent ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceChartsComponent);
    component = fixture.componentInstance;
    testUtils = TestUtils.createUtils(fixture);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title', () => {
    expect(testUtils.elemByDataQa('title')).toBeTruthy();
  });

  describe('bodycount-time chart', () => {
    it('should exist', () => {
      expect(testUtils.elemByDataQa('bodycount-time-chart')).toBeTruthy();
      // expect(component.bodyCountTimeChart).toBeTruthy();
    });

    it('should have a title', () => {
      expect(testUtils.elemByDataQa('bodycount-time-chart-title')).toBeTruthy();
    });

    it('should have a canvas', () => {
      expect(testUtils.elemByDataQa('bodycount-time-chart-canvas')).toBeTruthy();
    });
  });
});
