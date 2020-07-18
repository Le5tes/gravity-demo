import { Component, OnInit, Input, OnDestroy, AfterViewInit } from '@angular/core';
import Konva from "konva";
import {GravitySimulator} from '@gravity-simulator/gravity-simulator' 
import { interval, Subscription } from 'rxjs';

let uniqueid = 0

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.scss']
})
export class SimulationComponent implements OnInit, OnDestroy, AfterViewInit {
  simulator = GravitySimulator;

  _bodies;
  uniqueid = "simulation-container-" + uniqueid;
  $timer = interval(100);
  stage: Konva.Stage;
  layer: Konva.Layer;
  performance = {build: 0, draw: 0};
  private timerSubscription: Subscription

  @Input() height;
  @Input() width;

  @Input()
  set bodies (bodies) {
    this._bodies = bodies;
    if (this.stage) {
      this.resetStage();
      this.setupBodies();
      this.startSimulation();
    }
  }
  
  constructor() { }
  
  ngOnInit(): void {
  }
  
  ngAfterViewInit():void {
    this.setupStage();

    if(this._bodies) {
      this.setupBodies();
      this.startSimulation();
    }
  }
  
  ngOnDestroy(): void {
    uniqueid ++;
    this.stage.destroy();
    this.clearSubscription();
  }

  private startSimulation() {
    this.clearSubscription();
    this.simulator.create({gravityConstant: 0.00001}).then((sim) => {
      this.timerSubscription = this.$timer.subscribe(() => {
        this.updateBodyPositions(sim);
        this.stage.batchDraw();
      });
    });
  }

  private setupStage() {
    this.stage = new Konva.Stage({container: this.uniqueid, fill: '#101010', width: this.width, height: this.height});
    this.layer = new Konva.Layer()
    this.stage.add(this.layer);
  }

  private resetStage() {
    console.log('resetStage')
    this.stage.removeChildren();
    this.layer = new Konva.Layer();
    this.stage.add(this.layer)
  }

  private setupBodies() {
    this._bodies.forEach((body) => {
      body.render = new Konva.Circle({radius: body.radius, fill: body.colour})
      this.layer.add(body.render)
    })
  }

  private updateBodyPositions(sim) {
    sim.calculateNewPositions(this._bodies);
    this._bodies.forEach((body) => {
      body.render.x(body.positionX)
      body.render.y(body.positionY)
    });
  }

  private clearSubscription() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
