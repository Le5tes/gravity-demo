import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { chartConfig } from './chart-config/chart-config';
import { Tester } from '@gravity-simulator/gravity-tester';

@Component({
  selector: 'app-performance-charts',
  templateUrl: './performance-charts.component.html',
  styleUrls: ['./performance-charts.component.scss']
})
export class PerformanceChartsComponent implements OnInit {
  bodyCountTimeChart: Chart;

  constructor() { }

  ngOnInit() {
    const bodyNumbers = [10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000]

    this.getResults(bodyNumbers).then((results) => {
      chartConfig.bodyCountChart.options.scales.xAxes[0].labels = bodyNumbers.map(elem => elem.toString());
      chartConfig.bodyCountChart.data.datasets[0].data = results;
      
      this.bodyCountTimeChart = new Chart(
        document.getElementById('bodycount-time-chart-canvas'),
        chartConfig.bodyCountChart
        );
    });
  }

  getResults(bodyNumbers) : Promise<number[]> {
    return new Promise((res) => {
      (async () => {
        let result = []
        for (let i = 0; i < bodyNumbers.length; i++) {
          result[i] = await new Tester().testBuild(bodyNumbers[i])
        }
        return result;
      })().then((result) =>{
        res(result)
      });
    });
  }

}
