import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PerformanceChartsComponent } from './pages/performance-charts/performance-charts.component';
import { DemonstratorComponent } from './pages/demonstrator/demonstrator.component';
import { AboutComponent } from './pages/about/about.component';
import { AboutTheDeveloperComponent } from './pages/about-the-developer/about-the-developer.component';
import { DocumentationComponent } from './pages/documentation/documentation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    PerformanceChartsComponent,
    DemonstratorComponent,
    AboutComponent,
    AboutTheDeveloperComponent,
    DocumentationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
