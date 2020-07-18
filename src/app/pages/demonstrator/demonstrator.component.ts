import { Component, OnInit } from '@angular/core';
import { BodiesGenerationService } from 'src/app/services/bodies-generation/bodies-generation.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-demonstrator',
  templateUrl: './demonstrator.component.html',
  styleUrls: ['./demonstrator.component.scss']
})
export class DemonstratorComponent implements OnInit {
  bodies;
  form;
  width = 500;
  height = 500;

  constructor(public generateBodiesService: BodiesGenerationService, public fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({bodyCount: [1000]})
    this.bodies = this.generateBodiesService.generateBodies(1000, this.width, this.height);
  }

  setBodies() {
    this.bodies = this.generateBodiesService.generateBodies(this.bodyCount, this.width, this.height);
  }

  private get bodyCount(): number { return parseInt(this.form.get('bodyCount').value)}
}
