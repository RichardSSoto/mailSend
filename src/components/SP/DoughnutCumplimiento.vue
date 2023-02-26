<template>
  <div class="flex row justify-center" style="height:80%; width:100%">
    <div class="flex row justify-center" style="width: 100%;margin: 32px 0px;">
      <button @click="getAverage()">Test 2</button>
    </div>

    <doughnut-chart :options="options" :chartData="datacollection">
    </doughnut-chart>
  </div>
</template>

<script>
import DoughnutChart from "components/Charts/DoughnutChart.js";
import datos_asistentes from "../../DatosSP/datos_asistentes.json";
import datos_analistas from "../../DatosSP/datos_analistas.json";
import datos_coordinadores from "../../DatosSP/datos_coordinadores.json";
import datos_representantes from "../../DatosSP/datos_representantes.json";
import datos_gerentes from "../../DatosSP/datos_gerencia.json";
import datos_administradores from "../../DatosSP/datos_administradores.json";
import datos_tecnicos from "../../DatosSP/datos_tecnicos.json";

export default {
  components: {
    "doughnut-chart": DoughnutChart
  },
  data() {
    return {
      labels_cumplimiento: [
        "Claramente por debajo de lo esperado",
        "Ligeramente por debajo de lo esperado",
        "Cumple con lo requerido",
        "Ligeramente por encima de lo esperado",
        "Claramente por encima de lo esperado"
      ],
      porcentaje_por_objetivos: [],
      options: {
        cutoutPercentage: 90,
        plugins: {
          datalabels: {
            display: false
          }
        },
        title: {
          fontSize: 18,
          display: false,
          text: "Distribución de participantes por Cumplimiento de Objetivos"
        },
        legend: { display: false }
      },
      datacollection: null
    };
  },
  watch: {
    porcentaje_por_objetivos: {
      handler(newVal) {
        this.fillData();
      }
    }
  },
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
      let percentage_per_objetivo = [];
      let counter_percentage = new Array(5);
      for (let j = 0; j <= this.labels_cumplimiento.length - 1; j++) {
        counter_percentage[j] = 0;
        for (let i = 0; i <= datos_totales_usuarios.length - 1; i++) {
          for (let k = 0; k <= datos_totales_usuarios[i].length - 1; k++) {
            if (
              datos_totales_usuarios[i][k]["categoria_objetivo"] ===
              this.labels_cumplimiento[j]
            ) {
              counter_percentage[j] = counter_percentage[j] + 1;
            }
          }
        }
      }
      let total = counter_percentage.reduce((a, b) => a + b, 0);
      for (let k = 0; k <= this.labels_cumplimiento.length - 1; k++) {
        percentage_per_objetivo[k] = parseFloat(
          ((100 * counter_percentage[k]) / total).toFixed(1)
        );
      }
      this.porcentaje_por_objetivos = percentage_per_objetivo;
    },
    fillData() {
      this.datacollection = {
        labels: [
          "Claramente por debajo de lo esperado",
          "Ligeramente por debajo de lo esperado",
          "Cumple con lo requerido",
          "Ligeramente por encima de lo esperado",
          "Claramente por encima de lo esperado"
        ],
        datasets: [
          {
            borderWidth: 0,
            backgroundColor: [
              "#000000",
              "#FF0000",
              "#00aa00",
              "#FFFF00",
              "#708cf9"
            ],
            data: this.porcentaje_por_objetivos
          }
        ]
      };
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
