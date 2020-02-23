import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemonstratorComponent } from './demonstrator.component';

describe('DemonstratorComponent', () => {
  let component: DemonstratorComponent;
  let fixture: ComponentFixture<DemonstratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemonstratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemonstratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
