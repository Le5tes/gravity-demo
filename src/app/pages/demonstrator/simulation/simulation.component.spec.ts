import { async, ComponentFixture, TestBed, fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';

import { SimulationComponent } from './simulation.component';
import * as sinon from 'sinon';
import { TestUtils } from 'src/test-utils/classes/test-utils';
import { configureTestSuite } from 'src/test-utils/functions/configure-test-suite';
import Konva from 'konva';

fdescribe('SimulationComponent', () => {
  let component: SimulationComponent;
  let fixture: ComponentFixture<SimulationComponent>;
  let testUtils: TestUtils;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulationComponent ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulationComponent);
    component = fixture.componentInstance;
    testUtils = TestUtils.createUtils(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a canvas', () => {
    expect(testUtils.elemByDataQa('simulation-canvas')).toBeTruthy();
  });

  describe('visualisation', () => {
    it('should have a konva stage', () => {
      expect(component.stage).toBeTruthy();
    })
  })

  describe('set bodies', () => {
    let sandbox;
    let stubSimulatorCreate: sinon.SinonStub;
    let stubSimulator: sinon.SinonStub;
    beforeEach(() => {
      sandbox = sinon.createSandbox();
      stubSimulatorCreate = sandbox.stub(component.simulator, 'create')
      stubSimulator = {calculateNewPositions: sandbox.stub()};
      stubSimulatorCreate.returns(new Promise(res => res(stubSimulator)));
    })

    it('should create the conva layer', () => {
      component.bodies = [{mass: 100, xPosition: 0, yPosition: 0, xVelocity: 0, yVelocity: 0}]

      expect(component.layer).toBeTruthy();
    })

    it('should set the internal bodies and add render property as a konva circle', () => {
      component.bodies = [{mass: 100, xPosition: 0, yPosition: 0, xVelocity: 0, yVelocity: 0}]

      expect(component._bodies[0].mass).toEqual(100);
      expect(component._bodies[0].xPosition).toEqual(0);
      expect(component._bodies[0].yPosition).toEqual(0);
      expect(component._bodies[0].xVelocity).toEqual(0);
      expect(component._bodies[0].yVelocity).toEqual(0);
      expect(component._bodies[0].render instanceof Konva.Circle).toBeTruthy();
    });

    it('should create a simulator', () => {
      component.bodies = [{mass: 100, xPosition: 0, yPosition: 0, xVelocity: 0, yVelocity: 0}]

      expect(stubSimulatorCreate.calledOnce).toBeTruthy();
    });

    it('should subscribe to the timer', fakeAsync(() => {
      const stubTimerSubscribe = sandbox.stub(component.$timer, 'subscribe')

      component.bodies = [{mass: 100, xPosition: 0, yPosition: 0, xVelocity: 0, yVelocity: 0}]
      tick();

      expect(stubTimerSubscribe.calledOnce).toBeTruthy();
    }));

    describe('on timer tick', () => {
      let stubX;
      let stubY;
      let stubDraw;
      beforeEach(fakeAsync(() => {
        component.bodies = [{mass: 100, xPosition: 0, yPosition: 0, xVelocity: 0, yVelocity: 0}]
        stubX = sinon.stub(component._bodies[0].render, 'x')
        stubY = sinon.stub(component._bodies[0].render, 'y')
        stubDraw = sinon.stub(component.stage, 'batchDraw')
        tick(101);
        discardPeriodicTasks();
      }));

      it('should call the simulator to update the bodies positions', () => {
        expect(stubSimulator.calculateNewPositions.calledOnceWith(component._bodies)).toBeTruthy();
      });

      it('should update the positions of the renders based on the body positions', () => {
        expect(stubX.calledOnceWith(component._bodies[0].xPosition)).toBeTruthy();
        expect(stubY.calledOnceWith(component._bodies[0].yPosition)).toBeTruthy();
      });

      it('should draw everything to the stage', () => {
        expect(stubDraw.calledOnce).toBeTruthy();
      });
    });

    afterEach(() => {
      sandbox.restore();
    })
  });

});
