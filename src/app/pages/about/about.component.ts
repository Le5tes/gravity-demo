import { Component, OnInit } from '@angular/core';
import { BodiesGenerationService } from 'src/app/services/bodies-generation/bodies-generation.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  bodies;
  width = window.innerWidth + 400;
  height = window.innerHeight + 400;

  constructor(public generateBodiesService: BodiesGenerationService) { }

  ngOnInit() {
    this.bodies = this.generateBodiesService.generateBodies(1500, this.width, this.height);
  }

}
