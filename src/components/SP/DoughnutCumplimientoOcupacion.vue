<template>
  <div class="flex row justify-center" style="height:80%; width:100%">
    <div class="flex row justify-center" style="width: 100%;margin: 32px 0px;">
      <button @click="getAverage()">Cumplimiento por Ocupacion</button>
    </div>
    <div
      class="row flex justify-center"
      style="width:100%;max-width: 780px;margin: 32px 0px;height: 680px;"
      v-for="n in labels_ocupacion.length"
      :key="n"
    >
      <doughnut-chart
        style="height: 680px;width:680px;"
        :options="options"
        :chartData="datacollection[n - 1]"
      >
      </doughnut-chart>
    </div>
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
      labels_ocupacion: [
        "Gerentes",
        "Administradores",
        // "Coordinadores",
        "Analistas",
        // "Representantes",
        "Asistentes",
        "Técnicos"
      ],
      porcentaje_por_objetivos: [],
      options: {
        responsive: true,
        maintainAspectRatio: false,
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
      datacollection: []
    };
  },
  watch: {
    porcentaje_por_objetivos: {
      handler(newVal) {
        this.fillData();
      }
    }
  },
  /*created(){
    //tecnicos
    this.getTecnicos();
    //asistentes
    this.getAsistentes();
    //profesionales
    this.getAnalistas();
    this.getRepresentantes();
    this.getCoordinadores();
    //administradores
    this.getAdministradores();
    //gerencia
    this.getGerencia();
  },*/
  methods: {
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
      let percentage_per_objetivo = [];
      let counter_percentage = new Array(7);
      for (let i = 0; i <= datos_totales_usuarios.length - 1; i++) {
        counter_percentage[i] ? counter_percentage[i] : 0;
        counter_percentage[i] = new Array(5);
        for (let k = 0; k <= datos_totales_usuarios[i].length - 1; k++) {
          for (let j = 0; j <= this.labels_cumplimiento.length - 1; j++) {
            if (counter_percentage[i][j] == undefined) {
              counter_percentage[i][j] = 0;
            }
            if (
              datos_totales_usuarios[i][k]["categoria_objetivo"] ===
              this.labels_cumplimiento[j]
            ) {
              counter_percentage[i][j] = counter_percentage[i][j] + 1;
            }
          }
        }
      }
      let total = [];
      let partial_array = [];
      for (let k = 0; k <= datos_totales_usuarios.length - 1; k++) {
        partial_array = [];
        total = counter_percentage[k].reduce((a, b) => a + b, 0);
        for (let z = 0; z <= this.labels_cumplimiento.length - 1; z++) {
          partial_array.push(
            parseFloat(((100 * counter_percentage[k][z]) / total).toFixed(1))
          );
        }
        total = 0;
        percentage_per_objetivo.push(partial_array);
      }
      this.porcentaje_por_objetivos = percentage_per_objetivo;
    },
    fillData() {
      this.datacollection.length = 0;
      for (let i = 0; i <= 6; i++) {
        this.datacollection.push({
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
