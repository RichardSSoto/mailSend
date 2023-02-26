import { Radar, mixins } from "vue-chartjs";

const { reactiveProp } = mixins;
//Line,Bar,Radar,Pie,PolarArea,Doughnut,HorizontalBar
//Revisar a detalle estos (no comprobado aun)
//Bubble,Scatter
//Averiguar como elaborar los graficos de Funnel,pyramid,heatmap,sankey,chord,Timeseries,Angular Gauge
export default {
  extends: Radar,
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
