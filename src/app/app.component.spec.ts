import { TestBed, ComponentFixture, fakeAsync, tick, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TestUtils, byDataQa } from 'src/test-utils/classes/test-utils';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './app-routing.module';
import { Router } from '@angular/router';
import { Location } from "@angular/common";

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let appComponent: AppComponent;
  let testUtils: TestUtils;
  let location: Location;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        RouterTestingModule.withRoutes(routes)
      ]
    });
  }));

  beforeEach(() => {
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(AppComponent);
    appComponent = fixture.componentInstance;
    testUtils = TestUtils.createUtils(fixture);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(appComponent).toBeTruthy();
  });

  describe('side navigation', () => {
    it('should exist', () => {
      expect(testUtils.elemByDataQa('sidenav')).toBeTruthy();
    });

    describe('performance nav', () => {
      it('should exist', () => {
        expect(testUtils.elemByDataQa('nav-performance')).toBeTruthy();
      });

      it('should navigate to the performance page when clicked', fakeAsync(() => {
        testUtils.clickButtonQa('nav-performance');
        tick();

        expect(location.path()).toEqual('/performance');
      }));
    });

    describe('demonstrator nav', () => {
      it('should exist', () => {
        expect(testUtils.elemByDataQa('nav-demonstrator')).toBeTruthy();
      });

      it('should navigate to the performance page when clicked', fakeAsync(() => {
        testUtils.clickButtonQa('nav-demonstrator');
        tick();

        expect(location.path()).toEqual('/home');
      }));
    });
  });

  describe('toolbar', () => {
    it('should exist', () => {
      expect(testUtils.elemByDataQa('toolbar')).toBeTruthy();
    });
  });
});
