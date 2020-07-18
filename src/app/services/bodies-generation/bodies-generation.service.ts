import { Injectable } from '@angular/core';
import { calculateCircularOrbit } from '@gravity-simulator/gravity-utils';

@Injectable({
  providedIn: 'root'
})
export class BodiesGenerationService {

  constructor() { }

  generateBodies(number, width, height) {
    const bodies = []
    const centralBody = this.getCentreOfGalaxy(width, height);
    bodies.push(centralBody);
    for( let i = 1; i < number; i++) {
      bodies.push(this.generateStar(width, height, centralBody));
    }
    return bodies;
  }

  private generateStar(width, height, centralBody) {
    const mass = 10 + Math.random() * 10 ** 2
    const star = {
      mass: mass,
      radius: mass ** 0.57 / 10,
      positionX: Math.random() * width,
      positionY: Math.random() * height,
      colour: this.getColourForStarMass(mass)
    }
    const velocityvector = calculateCircularOrbit(star, centralBody, 0.00001);
    star['velocityX'] = Math.sqrt(Math.random() * 0.2 + 0.9) * velocityvector.x
    star['velocityY'] = Math.sqrt(Math.random() * 0.2 + 0.9) * velocityvector.y
    return star;
  }

  private getColourForStarMass(mass) {
    const blue = Math.floor(255 / (Math.abs(Math.log10(mass) - 3) + 1))
    const green = Math.floor(255 / (Math.abs(Math.log10(mass) - 2) / 2 + 1))
    const red = Math.floor(255 / (Math.abs(Math.log10(mass) - 1) / 4 + 1))
    return `#${this.toHex(red)}${this.toHex(green)}${this.toHex(blue)}`;
  }

  private toHex(dec) {
    return ('0' + dec.toString(16)).substr(-2);
  }

  private getCentreOfGalaxy(width, height) {
    return {
      mass: 10000000,
      positionX: width /2,
      positionY: height /2,
      radius: 5,
      velocityX: 0,
      velocityY: 0,
      colour: '#000000',
    };
  }
}
