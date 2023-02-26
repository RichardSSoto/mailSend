/*
import { Line } from 'vue-chartjs';

export default {
  extends: Line,
  props: {
    chartData: {
      type: Array | Object,
      required: false
    },
    chartLabels: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: true
            }
          }],
          xAxes: [ {
            gridLines: {
              display: false
            }
          }]
        },
        legend: {
          display: false
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted () {
    this.renderChart({
      labels: this.chartLabels,
      datasets: [
        {
          label: 'downloads',
          borderColor: '#249EBF',
          pointBackgroundColor: 'white',
          borderWidth: 1,
          pointBorderColor: '#249EBF',
          backgroundColor: 'transparent',
          data: this.chartData
        }
      ]
    }, this.options)
  }
}
*/

import { HorizontalBar, mixins } from "vue-chartjs";

const { reactiveProp } = mixins;
//Line,Bar,Radar,Pie,PolarArea,Doughnut,HorizontalBar
//Revisar a detalle estos (no comprobado aun)
//Bubble,Scatter
//Averiguar como elaborar los graficos de Funnel,pyramid,heatmap,sankey,chord,Timeseries,Angular Gauge
export default {
  extends: HorizontalBar,
  mixins: [reactiveProp],
  props: {
    chartData: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};
