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
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
