export const chartConfig = {
    bodyCountChart: {
        type: 'bar',
        data: {
            datasets: [{
                data: [],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    type: 'category',
                    labels: [],
                    scaleLabel: {
                        display: true,
                        labelString: 'Number of bodies'
                    }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Time (ms)'
                    }
                }]
            }
        }
    }
};
