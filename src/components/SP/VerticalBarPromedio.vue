<template>
  <div
    class="flex column items-center justify-center"
    style="height:100%; width:100%;max-width: 100%;"
  >
    <button class="row flex justify-center" @click="getAverage()">
      Last Test
    </button>
    <div
      class="row flex justify-start"
      style="width: 900px;height: 700px;margin: 32px 12.5% 0px 0px;"
    >
      <div
        style="width:33%;height: 50%;"
        v-for="n in labels_ocupacion.length"
        :key="n"
      >
        <vertical-bar
          style="width: 130%;height: 100%;"
          :options="options[n - 1]"
          :chartData="datacollection[n - 1]"
        >
        </vertical-bar>
      </div>
    </div>
  </div>
</template>

<script>
import VerticalBar from "components/Charts/VerticalBarChart.js";
import datos_asistentes from "../../DatosSP/datos_asistentes.json";
import datos_analistas from "../../DatosSP/datos_analistas.json";
import datos_coordinadores from "../../DatosSP/datos_coordinadores.json";
import datos_representantes from "../../DatosSP/datos_representantes.json";
import datos_gerentes from "../../DatosSP/datos_gerencia.json";
import datos_administradores from "../../DatosSP/datos_administradores.json";
import datos_tecnicos from "../../DatosSP/datos_tecnicos.json";

export default {
  components: {
    "vertical-bar": VerticalBar
  },
  data() {
    return {
      array_colores: ["#2271b3", "#28A2D3", "#19BF94"],
      backgroundColor: [],
      labels: [
        "Claramente por debajo de lo esperado",
        "Ligeramente por debajo de lo esperado",
        "Cumple con lo requerido",
        "Ligeramente por encima de lo esperado",
        "Claramente por encima de lo esperado"
      ],
      labels_notas: [
        "Cumplimiento de Objetivos",
        "Competencias",
        "Promedio general"
      ],
      labels_ocupacion: [
        "                               Técnico",
        "                               Asistente",
        // "                               Representante Comercial",
        "                               Analista",
        // "                               Coordinador / Supervisor",
        "                               Administrador / Jefe",
        "                               Gerente"
      ],
      labels_cumplimiento: [],
      notas_por_ocupacion: [],
      options: [],
      datacollection: [],
      filter_categorias_value: [
        {
          name: "Excelente",
          min_value: 19,
          max_value: 20
        },
        {
          name: "Destacado",
          min_value: 17,
          max_value: 18.9
        },
        {
          name: "Cumple",
          min_value: 15,
          max_value: 16.9
        },
        {
          name: "Cumple Parcialmente",
          min_value: 13,
          max_value: 14.9
        },
        {
          name: "Debajo de lo esperado",
          min_value: 0,
          max_value: 12.9
        }
      ],
    };
  },
  /*watch: {
    notas_por_ocupacion: {
      handler(newVal) {
        this.fillData();
      }
    }
  },*/
  methods: {
    getCategory(nota) {
      let categorySelected = "";
      categorySelected = this.filter_categorias_value
        .filter(x => nota >= x.min_value && nota <= x.max_value)
        .map(x => x.name)
        .shift();
      return categorySelected;
    },
    getAverage() {
      let datos_totales_usuarios = [
        datos_tecnicos,
        datos_asistentes,
        // datos_representantes,
        datos_analistas,
        // datos_coordinadores,
        datos_administradores,
        datos_gerentes
      ];
      //nota_objetivo
      //nota_competencia
      //promedio
      let percentage_per_area = [];
      let count = 0;
      let counter_por_ocupacion = [];
      let count_nota_objetivo = 0;
      let count_nota_competencia = 0;
      let count_promedio = 0;
      let counter_notas = [];
      let count_categories = [0, 0, 0, 0];
      for (let i = 0; i <= datos_totales_usuarios.length - 1; i++) {
        count = 0;
        count_nota_objetivo = 0;
        count_nota_competencia = 0;
        count_promedio = 0;
        counter_por_ocupacion[i] = 0;
        for (let k = 0; k <= datos_totales_usuarios[i].length - 1; k++) {
          count_nota_objetivo =
            parseInt(datos_totales_usuarios[i][k].nota_objetivo) +
            count_nota_objetivo;
          count_nota_competencia =
            parseInt(datos_totales_usuarios[i][k].nota_competencia) +
            count_nota_competencia;
          count_promedio =
            (parseInt(datos_totales_usuarios[i][k].nota_objetivo) +
              parseInt(datos_totales_usuarios[i][k].nota_competencia)) *
              0.5 +
            count_promedio;
          count = count + 1;
          counter_por_ocupacion[i] = counter_por_ocupacion[i] + 1;
          switch (
            this.getCategory(
              (parseInt(datos_totales_usuarios[i][k].nota_objetivo) +
                parseInt(datos_totales_usuarios[i][k].nota_competencia)) *
                0.5
            )
          ) {
            case "Destacado":
              count_categories[0] = count_categories[0] + 1;
              break;
            case "Bueno":
              count_categories[1] = count_categories[1] + 1;
              break;
            case "Necesita Mejorar":
              count_categories[2] = count_categories[2] + 1;
              break;
            case "Por debajo de lo esperado":
              count_categories[3] = count_categories[3] + 1;
              break;
          }
        }
        counter_notas.push([
          parseFloat((count_nota_objetivo / count).toFixed(1)),
          parseFloat((count_nota_competencia / count).toFixed(1)),
          parseFloat((count_promedio / count).toFixed(1))
        ]);
      }
      let promedio_general = 0;
      ///////
      let total = counter_por_ocupacion.reduce((a, b) => a + b, 0);
      for (let i = 0; i <= datos_totales_usuarios.length - 1; i++) {
        promedio_general =
          counter_notas[i][2] * counter_por_ocupacion[i] + promedio_general;
      }
      promedio_general = (promedio_general / total).toFixed(1);
      //////////////
      this.notas_por_ocupacion = counter_notas;
      this.fillData();
    },
    fillData() {
      this.datacollection = [];
      for (let i = 0; i <= this.labels_ocupacion.length - 1; i++) {
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
                display: true,
                stacked: true,
                ticks: {
                  fontSize: 16
                }
              }
            ],
            yAxes: [
              {
                ticks: {
                  fontSize: 16,
                  min: 0,
                  max: 20,
                  stepSize: 4,
                  scaleFontSize: 40
                }
              }
            ]
          },
          title: {
            display: true,
            position: "top",
            //textAlign: 'right',
            //align: "stretch",
            fontSize: 18,
            //maxWidth: 350,
            padding: 20,
            //horizontalAlign: "rigth",
            text: this.labels_ocupacion[i]
          },
          legend: {
            position: "right",
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
              ctx.textAlign = "center";
              ctx.fillStyle = "rgba(255, 255, 255, 1)";
              ctx.textBaseline = "middle";
              this.data.datasets.forEach(function(dataset, i) {
                var meta = chartInstance.controller.getDatasetMeta(i);
                meta.data.forEach(function(bar, index) {
                  var data = dataset.data[index];
                  var altura_util =
                    chartInstance.height -
                    chartInstance.scales["x-axis-0"].height;
                  ctx.fillText(
                    data,
                    bar._model.x,
                    bar._model.y + 0.5 * (altura_util - bar._model.y)
                  );
                });
              });
            }
          }
        });
        this.datacollection.push({
          labels: this.labels_notas,
          datasets: [
            {
              backgroundColor: this.array_colores,
              data: this.notas_por_ocupacion[i]
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
