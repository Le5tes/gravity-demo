import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemonstratorComponent } from './demonstrator.component';
import { TestUtils, simulateEvent } from 'src/test-utils/classes/test-utils';
import { SimulationComponent } from '../../components/simulation/simulation.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('DemonstratorComponent', () => {
  let component: DemonstratorComponent;
  let fixture: ComponentFixture<DemonstratorComponent>;
  let testUtils: TestUtils;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemonstratorComponent, SimulationComponent ],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemonstratorComponent);
    component = fixture.componentInstance;
    testUtils = TestUtils.createUtils(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a simulation', () => {
    expect(testUtils.elemByDataQa('simulator')).toBeTruthy();
  });

  describe('body count input box', () => {
    it('should exist', () => {
      expect(testUtils.elemByDataQa('bodies-input')).toBeTruthy();
    });
  });

  describe('set simulation button', () => {
    it('should exist', () => {
      expect(testUtils.elemByDataQa('set-simulation')).toBeTruthy();
    });

    it('should set the number of bodies to the value in the input box', () => {
      testUtils.elemByDataQa('bodies-input').value = "5000";
      simulateEvent('input', testUtils.elemByDataQa('bodies-input'));
      testUtils.clickButtonQa('set-simulation');

      expect(component.bodies.length).toEqual(5000);
    });
  });
});
