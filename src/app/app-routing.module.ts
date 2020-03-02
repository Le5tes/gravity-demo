import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerformanceChartsComponent } from './pages/performance-charts/performance-charts.component';

export const routes: Routes = [
  {
    path: '',
    children: []
  },
  { path: 'performance', component: PerformanceChartsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }