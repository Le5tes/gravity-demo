import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerformanceChartsComponent } from './pages/performance-charts/performance-charts.component';
import { DemonstratorComponent } from './pages/demonstrator/demonstrator.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'home', component: AboutComponent },
  { path: 'demonstrator', component: DemonstratorComponent },
  { path: 'performance', component: PerformanceChartsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }