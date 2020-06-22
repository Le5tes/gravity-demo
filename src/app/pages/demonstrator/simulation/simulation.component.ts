import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import Konva from "konva";
import {GravitySimulator} from '@gravity-simulator/gravity-simulator' 
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.scss']
})
export class SimulationComponent implements OnInit, OnDestroy {
  simulator = GravitySimulator;

  _bodies;
  $timer = interval(100);
  stage: Konva.Stage;
  layer: Konva.Layer;
  private timerSubscription: Subscription

  @Input()
  set bodies (bodies) {
    this.setupStage();
    this.setupBodies(bodies);
    this.clearSubscription();
    this.simulator.create().then((sim) => {
      this.timerSubscription = this.$timer.subscribe(() => {
        this.updateBodyPositions(sim);
        this.stage.batchDraw();
      });
    });
  }

  constructor() { }

  ngOnInit(): void {
    this.stage = new Konva.Stage({container:'simulation-canvas', fill: 'black'});
  }

  ngOnDestroy(): void {
    this.clearSubscription();
  }

  private setupStage() {
    this.layer = new Konva.Layer()
    this.stage.removeChildren();
    this.stage.add(this.layer);
  }

  private setupBodies(bodies) {
    this._bodies = bodies;
    this._bodies.forEach((body) => {
      body.render = new Konva.Circle({radius: 2, fill: 'white'})
      this.layer.add(body.render)
    })
  }

  private updateBodyPositions(sim) {
    sim.calculateNewPositions(this._bodies);
    this._bodies.forEach((body) => {
      body.render.x(body.xPosition)
      body.render.y(body.yPosition)
    });
  }

  private clearSubscription() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
