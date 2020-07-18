import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { chartConfig } from './chart-config/chart-config';
import { Tester } from '@gravity-simulator/gravity-tester';
import { transposeArray } from '../../utils/arrayUtils'
import { worker } from 'cluster';

@Component({
  selector: 'app-performance-charts',
  templateUrl: './performance-charts.component.html',
  styleUrls: ['./performance-charts.component.scss']
})
export class PerformanceChartsComponent implements OnInit {
  bodyCountTimeChart: Chart;
  iterationsChart: Chart;
  tester: Tester;

  constructor() { }

  ngOnInit() {
    this.tester = new Tester()

    this.buildBodyCountChart();
    this.buildIterationsChart();
  }

  buildBodyCountChart() {
    const bodyNumbers = [10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000]
    const bodyCountWorker = new Worker('./workers/bodycount-test-runner.worker', { type: 'module' })

    bodyCountWorker.onmessage = ({data}) => {
      chartConfig.bodyCountChart.options.scales.xAxes[0].labels = bodyNumbers.map(elem => elem.toString());
      chartConfig.bodyCountChart.data.datasets = this.mapToDataSets(data);
      
      this.bodyCountTimeChart = new Chart(
        document.getElementById('bodycount-time-chart-canvas'),
        chartConfig.bodyCountChart
      );
    };

    bodyCountWorker.postMessage(bodyNumbers)
  }

  buildIterationsChart() {
    const iterationWorker = new Worker('./workers/iteration-test-runner.worker', { type: 'module' })
    iterationWorker.onmessage = ({data}) => {
      chartConfig.iterationsChart.options.scales.xAxes[0].labels = [...Array(100).keys()];
      chartConfig.iterationsChart.data.datasets = this.mapToDataSets(data);
      
      this.iterationsChart = new Chart(
        document.getElementById('iteration-time-chart-canvas'),
        chartConfig.iterationsChart
      );
    };

    iterationWorker.postMessage({bodyCount:5000, numberOfIterations: 50});
  }

  private mapToDataSets(results) {
    const transArr = transposeArray(results, results.length);
    return [{
      label: 'build tree',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
      data: transArr[0]
    },{
      label: 'resolve tree',
      backgroundColor: 'rgba(99, 255, 132, 0.2)',
      borderColor: 'rgba(99, 255, 132, 1)',
      borderWidth: 1,
      data: transArr[1]
    }]
  }
}
