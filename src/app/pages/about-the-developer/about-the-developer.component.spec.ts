import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutTheDeveloperComponent } from './about-the-developer.component';

describe('AboutTheDeveloperComponent', () => {
  let component: AboutTheDeveloperComponent;
  let fixture: ComponentFixture<AboutTheDeveloperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutTheDeveloperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutTheDeveloperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
