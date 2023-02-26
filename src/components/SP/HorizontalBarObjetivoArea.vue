<template>
  <div
    class="flex column items-center justify-center"
    style="height:100%; width:98%;max-width: 900px;"
  >
    <button
      class="row flex justify-center"
      style="margin-bottom: 24px;"
      @click="getAverage()"
    >
      Test new
    </button>
    <div
      class="row flex justify-center"
      style="width:100%;max-width: 900px;margin: 8px 0px;height: 400px"
      v-for="n in titulo_area.length"
      :key="n"
    >
      <horizontal-bar
        style="width: 100%;max-width: 900px;height: 400px;"
        :options="options[n - 1]"
        :chartData="datacollection[n - 1]"
      >
      </horizontal-bar>
    </div>
  </div>
</template>

<script>
import HorizontalBar from "components/Charts/HorizontalBarChart.js";
import datos_asistentes from "../../DatosSP/datos_asistentes.json";
import datos_analistas from "../../DatosSP/datos_analistas.json";
import datos_coordinadores from "../../DatosSP/datos_coordinadores.json";
import datos_representantes from "../../DatosSP/datos_representantes.json";
import datos_gerentes from "../../DatosSP/datos_gerencia.json";
import datos_administradores from "../../DatosSP/datos_administradores.json";
import datos_tecnicos from "../../DatosSP/datos_tecnicos.json";
import ChartDataLabels from "chartjs-plugin-datalabels";

export default {
  components: {
    "horizontal-bar": HorizontalBar
  },
  data() {
    return {
      array_colores: ["#a252df", "#00aaea", "#2271b3", "#a2cadf", "#0000aa"],
      backgroundColor: [],
      labels: [
        "Claramente por debajo de lo esperado",
        "Ligeramente por debajo de lo esperado",
        "Cumple con lo requerido",
        "Ligeramente por encima de lo esperado",
        "Claramente por encima de lo esperado"
      ],
      titulo_area: [
        "Electrónica Naval"
      ],
      titulo_gráfica: [
        "                                                  Electrónica Naval"
      ],
      labels_cumplimiento: [],
      porcentaje_por_objetivos: [],
      options: [],
      datacollection: []
    };
  },
  /*watch: {
    porcentaje_por_objetivos: {
      handler(newVal) {
        this.fillData();
      }
    }
  },*/
  methods: {
    getAverage() {
      let datos_totales_usuarios = [
        datos_tecnicos,
        datos_asistentes,
        datos_representantes,
        datos_analistas,
        datos_coordinadores,
        datos_administradores,
        datos_gerentes
      ];
      let percentage_per_area = [];
      let counter_percentage = new Array(this.titulo_area.length);
      for (let j = 0; j <= this.titulo_area.length - 1; j++) {
        counter_percentage[j] ? counter_percentage[j] : 0;
        counter_percentage[j] = new Array(5);
        for (let i = 0; i <= datos_totales_usuarios.length - 1; i++) {
          for (let k = 0; k <= datos_totales_usuarios[i].length - 1; k++) {
            for (let z = 0; z <= this.labels.length - 1; z++) {
              if (counter_percentage[j][z] == undefined) {
                counter_percentage[j][z] = 0;
              }
              if (
                datos_totales_usuarios[i][k]["area"] === this.titulo_area[j]
              ) {
                if (
                  this.labels[z] ==
                  datos_totales_usuarios[i][k]["categoria_objetivo"]
                ) {
                  counter_percentage[j][z] = counter_percentage[j][z] + 1;
                }
              }
            }
          }
        }
      }
      let total = [];
      let percen = [];
      let array_color = [];
      let array_labels = [];
      for (let k = 0; k <= this.titulo_area.length - 1; k++) {
        percen = [];
        total.push(counter_percentage[k].reduce((a, b) => a + b, 0));
        for (let z = 0; z <= this.labels.length - 1; z++) {
          percen.push(
            parseFloat(((100 * counter_percentage[k][z]) / total[k]).toFixed(1))
          );
        }
        array_color = [];
        array_labels = [];
        for (let z = 0; z <= percen.length - 1; z++) {
          array_color.push(this.array_colores[z]);
          array_labels.push(this.labels[z]);
          if (percen[z] == 0) {
            percen.splice(z, 1, 0.5);
          }
        }
        this.backgroundColor.push(array_color);
        this.labels_cumplimiento.push(array_labels);
        percentage_per_area.push(percen);
        /*array_color = [];
        array_labels = [];
        for(let z = 0; z <= percen.length - 1; z++){
          if(percen[z] !== 0){
            array_color.push(this.array_colores[z])
            array_labels.push(this.labels[z])
          }
        }
        this.backgroundColor.push(array_color)
        this.labels_cumplimiento.push(array_labels)
        percen = percen.filter(value => value != 0);
        percentage_per_area.push(percen);*/
      }

      this.porcentaje_por_objetivos = percentage_per_area;
      this.fillData();
    },
    fillData() {
      this.datacollection = [];
      for (let i = 0; i <= this.titulo_area.length - 1; i++) {
        this.options.push({
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            datalabels: {
              display: false
            }
          },
          defaultFontColor: "#8a8989",
          defaultFontFamily:
            "'Maax-Standard', 'Helvetica', 'Arial', 'sans-serif'",
          scales: {
            xAxes: [
              {
                stacked: true,
                ticks: {
                  fontStyle: "bold",
                  fontColor: "#000",
                  fontSize: 20,
                  min: 0,
                  max: 100
                }
              }
            ],
            yAxes: [
              {
                ticks: {
                  fontSize: 18,
                  fontStyle: "bold",
                  fontColor: "#000",
                  stepSize: 4,
                  scaleFontSize: 40
                }
              }
            ]
          },
          title: {
            display: true,
            fontSize: 22,
            fontColor: "#000",
            padding: 20,
            text: this.titulo_gráfica[i]
          },
          legend: {
            labels: {
              verticalAlign: "center",
              horizontalAlign: "center",
              maxWidth: 100,
              fontSize: 16
            },
            display: false
          },
          tooltips: {
            enabled: true
          },
          hover: {
            animationDuration: 0
          },
          layout: {
            /*margin: {
              left: 50,
              right: 50,
              top: 150,
              bottom: 50
            }*/
          },
          animation: {
            duration: 1,
            onComplete: function() {
              var chartInstance = this.chart,
                ctx = chartInstance.ctx;
              ctx.textAlign = "top";
              ctx.fillStyle = "rgba(0, 0, 0, 1)";
              ctx.textBaseline = "center";
              this.data.datasets.forEach(function(dataset, i) {
                var meta = chartInstance.controller.getDatasetMeta(i);
                meta.data.forEach(function(bar, index) {
                  var data = dataset.data[index];
                  if (data >= 90) {
                    ctx.fillText(
                      data + "%",
                      bar._model.x - 60,
                      bar._model.y + 5
                    );
                  } else {
                    if (data <= 0.5) {
                      ctx.fillText("0%", bar._model.x + 5, bar._model.y + 5);
                    } else {
                      ctx.fillText(
                        data + "%",
                        bar._model.x + 5,
                        bar._model.y + 5
                      );
                    }
                  }
                });
              });
            }
          }
        });
        this.datacollection.push({
          labels: this.labels_cumplimiento[i],
          datasets: [
            {
              backgroundColor: this.backgroundColor[i],
              data: this.porcentaje_por_objetivos[i]
            }
          ]
        });
      }
    }
  }
};
</script>

<style>
.area {
  width: 500px;
  margin: auto;
}
.my-button {
  background-color: rgb(0, 255, 21);
  color: brown;
}
</style>
