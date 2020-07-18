import { TestBed } from '@angular/core/testing';

import { BodiesGenerationService } from './bodies-generation.service';

describe('BodiesGenerationService', () => {
  let service: BodiesGenerationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BodiesGenerationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('generateBodies', () => {
    it('should exist', () => {
      expect(service.generateBodies).toBeTruthy();
    });

    it('should generate an array of bodies of length of the number passed in', () => {
      expect(service.generateBodies(1000, 100, 100).length).toEqual(1000);
    });
  });
});
