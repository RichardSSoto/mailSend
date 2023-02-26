import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

//Line,Bar,Radar,Pie,PolarArea,Doughnut,HorizontalBar
//Revisar a detalle estos (no comprobado aun)
//Bubble,Scatter
//Averiguar como elaborar los graficos de Funnel,pyramid,heatmap,sankey,chord,Timeseries,Angular Gauge
export default {
  extends: Line,
  mixins: [reactiveProp],
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          datalabels: {
            display: false
          }
        },
        legendCallback: function(chart) {
          var legendHtml = [];
          legendHtml.push("<ul>");
          var item = chart.data.datasets[0];
          for (var i = 0; i < item.data.length; i++) {
            legendHtml.push("<li>");
            legendHtml.push(
              '<span class="chart-legend" style="color:' +
                item.backgroundColor[i] +
                '"></span>'
            );
            legendHtml.push(
              '<span class="chart-legend-label-text">' +
                item.data[i] +
                " person - " +
                chart.data.labels[i] +
                " times</span>"
            );
            legendHtml.push("</li>");
          }

          legendHtml.push("</ul>");
          return legendHtml.join("");
        }
      },
      datacollection: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July"
        ],
        datasets: [
          {
            label: "Data One",
            backgroundColor: [
              "#00ff00",
              "#ff0000",
              "#0000ff",
              "#00ff00",
              "#ff0000",
              "#0000ff",
              "#00ff00"
            ],
            data: [40, 39, 10, 40, 39, 80, 40]
          }
        ]
      }
    };
  },
  mounted() {
    this.renderChart(this.datacollection, this.options);
    const HTML = this.$data._chart.generateLegend();
    this.$emit("generated", HTML);
  }
};
