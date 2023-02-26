<template>
  <div class="flex column items-center" style="height:100%; width:100%">
    <div class="flex row justify-center items-center" style="widht: 100%;">
      <button @click="getAverage()">Test2</button>
    </div>
    <div
      class="flex row justify-center items-center"
      style="width: 600px;height: 600px;"
    >
      <doughnut-chart
        style="width: 600px;height: 600px;"
        :options="options"
        :chartData="datacollection"
      >
      </doughnut-chart>
    </div>
  </div>
</template>

<script>
import DoughnutChart from "components/Charts/DoughnutChart.js";
import datos_asistentes from "../../DatosMP/datos_asistentes.json";
import datos_analistas from "../../DatosMP/datos_analistas.json";
import datos_coordinadores from "../../DatosMP/datos_coordinadores.json";
import datos_representantes from "../../DatosMP/datos_representantes.json";
import datos_gerentes from "../../DatosMP/datos_gerencia.json";
import datos_administradores from "../../DatosMP/datos_administradores.json";
import datos_tecnicos from "../../DatosMP/datos_tecnicos.json";

export default {
  components: {
    "doughnut-chart": DoughnutChart
  },
  data() {
    return {
      prom_tecnicos: {},
      prom_asistentes: {},
      prom_gerentes: {},
      prom_analistas: {},
      prom_representantes: {},
      prom_coordinadores: {},
      prom_administradores: {},
      total_trabajadores: 0,
      percentage_ocupations: [],
      options: {
        plugins: {
          datalabels: {
            align: "end",
            anchor: "end",
            color: function(ctx) {
              return ctx.dataset.backgroundColor[0];
            },
            font: { size: 18, weight: "bold" },
            formatter: function(value, ctx) {
              //return ctx.active ? "index" : "#" + (ctx.dataIndex + 1);
              return value + "%";
            },
            offset: 8,
            opacity: function(ctx) {
              //return ctx.active ? 1 : 0.5;
              return 1;
            }
          }
        },
        aspectRatio: 4 / 3,
        layout: {
          padding: 50
        },
        elements: {
          line: {
            fill: false
          },
          point: {
            hoverRadius: 7,
            radius: 5
          }
        },
        cutoutPercentage: 90,
        title: {
          display: true,
          padding: 50,
          fontSize: 24,
          fontStyle: "bold",
          text: "Distribución de participantes por Grupo Ocupacional"
        },
        legend: { display: false }
      },
      datacollection: null,
      test: "Hello"
    };
  },
  mounted() {
    this.fillData();
  },
  watch: {
    percentage_ocupations: {
      handler(newVal) {
        this.fillData();
      }
    }
  },
  created() {
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
  },
  methods: {
    getAverage() {
      this.percentage_ocupations.length = 0;
      this.total_trabajadores = 0;
      let datos_totales = [
        this.prom_tecnicos,
        this.prom_asistentes,
        this.prom_analistas,
        this.prom_representantes,
        this.prom_coordinadores,
        this.prom_administradores,
        this.prom_gerentes
      ];
      for (let i = 0; i <= datos_totales.length - 1; i++) {
        this.total_trabajadores =
          this.total_trabajadores + datos_totales[i].cantidad;
      }
      for (let i = 0; i <= datos_totales.length - 1; i++) {
        let percentage = 0;
        percentage = parseFloat(
          (datos_totales[i].cantidad / this.total_trabajadores) * 100
        );
        this.percentage_ocupations.push(percentage.toFixed(1));
      }
    },
    fillData() {
      this.datacollection = {
        labels: [
          "Técnicos",
          "Asistentes",
          "Rep. Comercial",
          "Analistas",
          "Coordinadores",
          "Administradores",
          "Gerentes"
        ],
        datasets: [
          {
            borderWidth: 0,
            backgroundColor: [
              "#214069",
              "#385278",
              "#4d6687",
              "#637894",
              "#7a8ca3",
              "#a6b3c2",
              "#e8ebf0"
            ],
            data: this.percentage_ocupations
          }
        ]
      };
    },
    getTecnicos() {
      //tecnico
      let counter = 0;
      let prom_trabajo_en_equipo = 0;
      let prom_productividad = 0;
      let prom_iniciativa = 0;
      let prom_tolerancia_presion = 0;
      let prom_orientacion_logro = 0;
      for (let i = 0; i <= datos_tecnicos.length - 1; i++) {
        if (datos_tecnicos[i]) {
          counter = counter + 1;
          prom_iniciativa =
            prom_iniciativa + parseInt(datos_tecnicos[i].iniciativa);
          prom_trabajo_en_equipo =
            prom_trabajo_en_equipo +
            parseInt(datos_tecnicos[i].trabajo_en_equipo);
          prom_productividad =
            prom_productividad + parseInt(datos_tecnicos[i].productividad);
          prom_tolerancia_presion =
            prom_tolerancia_presion +
            parseInt(datos_tecnicos[i].tolerancia_presion);
          prom_orientacion_logro =
            prom_orientacion_logro +
            parseInt(datos_tecnicos[i].orientacion_logro);
        }
      }
      this.prom_tecnicos.prom_trabajo_en_equipo = parseFloat(
        (prom_trabajo_en_equipo / counter).toFixed(1)
      );
      this.prom_tecnicos.prom_productividad = parseFloat(
        (prom_productividad / counter).toFixed(1)
      );
      this.prom_tecnicos.prom_iniciativa = parseFloat(
        (prom_iniciativa / counter).toFixed(1)
      );
      this.prom_tecnicos.prom_tolerancia_presion = parseFloat(
        (prom_tolerancia_presion / counter).toFixed(1)
      );
      this.prom_tecnicos.prom_orientacion_logro = parseFloat(
        (prom_orientacion_logro / counter).toFixed(1)
      );
      this.prom_tecnicos.cantidad = datos_tecnicos.length;
    },
    getAsistentes() {
      let counter = 0;
      let prom_comunicacion = 0;
      let prom_iniciativa = 0;
      let prom_trabajo_en_equipo = 0;
      let prom_productividad = 0;
      let prom_tolerancia_presion = 0;
      let prom_orientacion_logro = 0;
      for (let i = 0; i <= datos_asistentes.length - 1; i++) {
        if (datos_asistentes[i]) {
          counter = counter + 1;
          prom_comunicacion =
            prom_comunicacion + parseInt(datos_asistentes[i].comunicacion);
          prom_iniciativa =
            prom_iniciativa + parseInt(datos_asistentes[i].iniciativa);
          prom_trabajo_en_equipo =
            prom_trabajo_en_equipo +
            parseInt(datos_asistentes[i].trabajo_en_equipo);
          prom_productividad =
            prom_productividad + parseInt(datos_asistentes[i].productividad);
          prom_tolerancia_presion =
            prom_tolerancia_presion +
            parseInt(datos_asistentes[i].tolerancia_presion);
          prom_orientacion_logro =
            prom_orientacion_logro +
            parseInt(datos_asistentes[i].orientacion_logro);
        }
      }
      this.prom_asistentes.prom_comunicacion = parseFloat(
        (prom_comunicacion / counter).toFixed(1)
      );
      this.prom_asistentes.prom_iniciativa = parseFloat(
        (prom_iniciativa / counter).toFixed(1)
      );
      this.prom_asistentes.prom_trabajo_en_equipo = parseFloat(
        (prom_trabajo_en_equipo / counter).toFixed(1)
      );
      this.prom_asistentes.prom_productividad = parseFloat(
        (prom_productividad / counter).toFixed(1)
      );
      this.prom_asistentes.prom_tolerancia_presion = parseFloat(
        (prom_tolerancia_presion / counter).toFixed(1)
      );
      this.prom_asistentes.prom_orientacion_logro = parseFloat(
        (prom_orientacion_logro / counter).toFixed(1)
      );
      this.prom_asistentes.cantidad = datos_asistentes.length;
    },
    getAnalistas() {
      let counter = 0;
      let prom_comunicacion = 0;
      let prom_trabajo_en_equipo = 0;
      let prom_productividad = 0;
      let prom_flexibilidad = 0;
      let prom_iniciativa = 0;
      let prom_tolerancia_presion = 0;
      let prom_planificacion_organizacion = 0;
      for (let i = 0; i <= datos_analistas.length - 1; i++) {
        if (datos_analistas[i]) {
          counter = counter + 1;
          prom_comunicacion =
            prom_comunicacion + parseInt(datos_analistas[i].comunicacion);
          prom_trabajo_en_equipo =
            prom_trabajo_en_equipo +
            parseInt(datos_analistas[i].trabajo_en_equipo);
          prom_productividad =
            prom_productividad + parseInt(datos_analistas[i].productividad);
          prom_flexibilidad =
            prom_flexibilidad + parseInt(datos_analistas[i].flexibilidad);
          prom_iniciativa =
            prom_iniciativa + parseInt(datos_analistas[i].iniciativa);
          prom_tolerancia_presion =
            prom_tolerancia_presion +
            parseInt(datos_analistas[i].tolerancia_presion);
          prom_planificacion_organizacion =
            prom_planificacion_organizacion +
            parseInt(datos_analistas[i].planificacion_organizacion);
        }
      }
      this.prom_analistas.prom_comunicacion = parseFloat(
        (prom_comunicacion / counter).toFixed(1)
      );
      this.prom_analistas.prom_trabajo_en_equipo = parseFloat(
        (prom_trabajo_en_equipo / counter).toFixed(1)
      );
      this.prom_analistas.prom_productividad = parseFloat(
        (prom_productividad / counter).toFixed(1)
      );
      this.prom_analistas.prom_flexibilidad = parseFloat(
        (prom_flexibilidad / counter).toFixed(1)
      );
      this.prom_analistas.prom_iniciativa = parseFloat(
        (prom_iniciativa / counter).toFixed(1)
      );
      this.prom_analistas.prom_tolerancia_presion = parseFloat(
        (prom_tolerancia_presion / counter).toFixed(1)
      );
      this.prom_analistas.prom_planificacion_organizacion = parseFloat(
        (prom_planificacion_organizacion / counter).toFixed(1)
      );
      this.prom_analistas.cantidad = datos_analistas.length;
    },
    getRepresentantes() {
      let counter = 0;
      let prom_comunicacion = 0;
      let prom_trabajo_en_equipo = 0;
      let prom_productividad = 0;
      let prom_iniciativa = 0;
      let prom_tolerancia_presion = 0;
      let prom_planificacion_organizacion = 0;
      let prom_orientacion_logro = 0;
      for (let i = 0; i <= datos_representantes.length - 1; i++) {
        if (datos_representantes[i]) {
          counter = counter + 1;
          prom_comunicacion =
            prom_comunicacion + parseInt(datos_representantes[i].comunicacion);
          prom_trabajo_en_equipo =
            prom_trabajo_en_equipo +
            parseInt(datos_representantes[i].trabajo_en_equipo);
          prom_productividad =
            prom_productividad +
            parseInt(datos_representantes[i].productividad);
          prom_iniciativa =
            prom_iniciativa + parseInt(datos_representantes[i].iniciativa);
          prom_tolerancia_presion =
            prom_tolerancia_presion +
            parseInt(datos_representantes[i].tolerancia_presion);
          prom_planificacion_organizacion =
            prom_planificacion_organizacion +
            parseInt(datos_representantes[i].planificacion_organizacion);
          prom_orientacion_logro =
            prom_orientacion_logro +
            parseInt(datos_representantes[i].orientacion_logro);
        }
      }
      this.prom_representantes.prom_comunicacion = parseFloat(
        (prom_comunicacion / counter).toFixed(1)
      );
      this.prom_representantes.prom_trabajo_en_equipo = parseFloat(
        (prom_trabajo_en_equipo / counter).toFixed(1)
      );
      this.prom_representantes.prom_productividad = parseFloat(
        (prom_productividad / counter).toFixed(1)
      );
      this.prom_representantes.prom_iniciativa = parseFloat(
        (prom_iniciativa / counter).toFixed(1)
      );
      this.prom_representantes.prom_tolerancia_presion = parseFloat(
        (prom_tolerancia_presion / counter).toFixed(1)
      );
      this.prom_representantes.prom_planificacion_organizacion = parseFloat(
        (prom_planificacion_organizacion / counter).toFixed(1)
      );
      this.prom_representantes.prom_orientacion_logro = parseFloat(
        (prom_orientacion_logro / counter).toFixed(1)
      );
      this.prom_representantes.cantidad = datos_representantes.length;
    },
    getCoordinadores() {
      let counter = 0;
      let prom_comunicacion = 0;
      let prom_liderazgo = 0;
      let prom_trabajo_en_equipo = 0;
      let prom_productividad = 0;
      let prom_flexibilidad = 0;
      let prom_iniciativa = 0;
      let prom_tolerancia_presion = 0;
      let prom_planificacion_organizacion = 0;
      let prom_orientacion_logro = 0;
      for (let i = 0; i <= datos_coordinadores.length - 1; i++) {
        if (datos_coordinadores[i]) {
          counter = counter + 1;
          prom_comunicacion =
            prom_comunicacion + parseInt(datos_coordinadores[i].comunicacion);
          prom_liderazgo =
            prom_liderazgo + parseInt(datos_coordinadores[i].liderazgo);
          prom_trabajo_en_equipo =
            prom_trabajo_en_equipo +
            parseInt(datos_coordinadores[i].trabajo_en_equipo);
          prom_productividad =
            prom_productividad + parseInt(datos_coordinadores[i].productividad);
          prom_flexibilidad =
            prom_flexibilidad + parseInt(datos_coordinadores[i].flexibilidad);
          prom_iniciativa =
            prom_iniciativa + parseInt(datos_coordinadores[i].iniciativa);
          prom_tolerancia_presion =
            prom_tolerancia_presion +
            parseInt(datos_coordinadores[i].tolerancia_presion);
          prom_planificacion_organizacion =
            prom_planificacion_organizacion +
            parseInt(datos_coordinadores[i].planificacion_organizacion);
          prom_orientacion_logro =
            prom_orientacion_logro +
            parseInt(datos_coordinadores[i].orientacion_logro);
        }
      }
      this.prom_coordinadores.prom_comunicacion = parseFloat(
        (prom_comunicacion / counter).toFixed(1)
      );
      this.prom_coordinadores.prom_liderazgo = parseFloat(
        (prom_liderazgo / counter).toFixed(1)
      );
      this.prom_coordinadores.prom_trabajo_en_equipo = parseFloat(
        (prom_trabajo_en_equipo / counter).toFixed(1)
      );
      this.prom_coordinadores.prom_productividad = parseFloat(
        (prom_productividad / counter).toFixed(1)
      );
      this.prom_coordinadores.prom_flexibilidad = parseFloat(
        (prom_flexibilidad / counter).toFixed(1)
      );
      this.prom_coordinadores.prom_iniciativa = parseFloat(
        (prom_iniciativa / counter).toFixed(1)
      );
      this.prom_coordinadores.prom_tolerancia_presion = parseFloat(
        (prom_tolerancia_presion / counter).toFixed(1)
      );
      this.prom_coordinadores.prom_planificacion_organizacion = parseFloat(
        (prom_planificacion_organizacion / counter).toFixed(1)
      );
      this.prom_coordinadores.prom_orientacion_logro = parseFloat(
        (prom_orientacion_logro / counter).toFixed(1)
      );
      this.prom_coordinadores.cantidad = datos_coordinadores.length;
    },
    getAdministradores() {
      let counter = 0;
      let prom_comunicacion = 0;
      let prom_liderazgo = 0;
      let prom_trabajo_en_equipo = 0;
      let prom_productividad = 0;
      let prom_flexibilidad = 0;
      let prom_iniciativa = 0;
      let prom_tolerancia_presion = 0;
      let prom_planificacion_organizacion = 0;
      let prom_orientacion_logro = 0;
      for (let i = 0; i <= datos_administradores.length - 1; i++) {
        if (datos_administradores[i]) {
          counter = counter + 1;
          prom_comunicacion =
            prom_comunicacion + parseInt(datos_administradores[i].comunicacion);
          prom_liderazgo =
            prom_liderazgo + parseInt(datos_administradores[i].liderazgo);
          prom_trabajo_en_equipo =
            prom_trabajo_en_equipo +
            parseInt(datos_administradores[i].trabajo_en_equipo);
          prom_productividad =
            prom_productividad +
            parseInt(datos_administradores[i].productividad);
          prom_flexibilidad =
            prom_flexibilidad + parseInt(datos_administradores[i].flexibilidad);
          prom_iniciativa =
            prom_iniciativa + parseInt(datos_administradores[i].iniciativa);
          prom_tolerancia_presion =
            prom_tolerancia_presion +
            parseInt(datos_administradores[i].tolerancia_presion);
          prom_planificacion_organizacion =
            prom_planificacion_organizacion +
            parseInt(datos_administradores[i].planificacion_organizacion);
          prom_orientacion_logro =
            prom_orientacion_logro +
            parseInt(datos_administradores[i].orientacion_logro);
        }
      }
      this.prom_administradores.prom_comunicacion = parseFloat(
        (prom_comunicacion / counter).toFixed(1)
      );
      this.prom_administradores.prom_liderazgo = parseFloat(
        (prom_liderazgo / counter).toFixed(1)
      );
      this.prom_administradores.prom_trabajo_en_equipo = parseFloat(
        (prom_trabajo_en_equipo / counter).toFixed(1)
      );
      this.prom_administradores.prom_productividad = parseFloat(
        (prom_productividad / counter).toFixed(1)
      );
      this.prom_administradores.prom_flexibilidad = parseFloat(
        (prom_flexibilidad / counter).toFixed(1)
      );
      this.prom_administradores.prom_iniciativa = parseFloat(
        (prom_iniciativa / counter).toFixed(1)
      );
      this.prom_administradores.prom_tolerancia_presion = parseFloat(
        (prom_tolerancia_presion / counter).toFixed(1)
      );
      this.prom_administradores.prom_planificacion_organizacion = parseFloat(
        (prom_planificacion_organizacion / counter).toFixed(1)
      );
      this.prom_administradores.prom_orientacion_logro = parseFloat(
        (prom_orientacion_logro / counter).toFixed(1)
      );
      this.prom_administradores.cantidad = datos_administradores.length;
    },
    getGerencia() {
      let counter = 0;
      let prom_comunicacion = 0;
      let prom_liderazgo = 0;
      let prom_trabajo_en_equipo = 0;
      let prom_productividad = 0;
      let prom_flexibilidad = 0;
      let prom_iniciativa = 0;
      let prom_tolerancia_presion = 0;
      let prom_planificacion_organizacion = 0;
      let prom_orientacion_logro = 0;
      for (let i = 0; i <= datos_gerentes.length - 1; i++) {
        if (datos_gerentes[i]) {
          counter = counter + 1;
          prom_comunicacion =
            prom_comunicacion + parseInt(datos_gerentes[i].comunicacion);
          prom_liderazgo =
            prom_liderazgo + parseInt(datos_gerentes[i].liderazgo);
          prom_trabajo_en_equipo =
            prom_trabajo_en_equipo +
            parseInt(datos_gerentes[i].trabajo_en_equipo);
          prom_productividad =
            prom_productividad + parseInt(datos_gerentes[i].productividad);
          prom_flexibilidad =
            prom_flexibilidad + parseInt(datos_gerentes[i].flexibilidad);
          prom_iniciativa =
            prom_iniciativa + parseInt(datos_gerentes[i].iniciativa);
          prom_tolerancia_presion =
            prom_tolerancia_presion +
            parseInt(datos_gerentes[i].tolerancia_presion);
          prom_planificacion_organizacion =
            prom_planificacion_organizacion +
            parseInt(datos_gerentes[i].planificacion_organizacion);
          prom_orientacion_logro =
            prom_orientacion_logro +
            parseInt(datos_gerentes[i].orientacion_logro);
        }
      }
      this.prom_gerentes.prom_comunicacion = parseFloat(
        (prom_comunicacion / counter).toFixed(1)
      );
      this.prom_gerentes.prom_liderazgo = parseFloat(
        (prom_liderazgo / counter).toFixed(1)
      );
      this.prom_gerentes.prom_trabajo_en_equipo = parseFloat(
        (prom_trabajo_en_equipo / counter).toFixed(1)
      );
      this.prom_gerentes.prom_productividad = parseFloat(
        (prom_productividad / counter).toFixed(1)
      );
      this.prom_gerentes.prom_flexibilidad = parseFloat(
        (prom_flexibilidad / counter).toFixed(1)
      );
      this.prom_gerentes.prom_iniciativa = parseFloat(
        (prom_iniciativa / counter).toFixed(1)
      );
      this.prom_gerentes.prom_tolerancia_presion = parseFloat(
        (prom_tolerancia_presion / counter).toFixed(1)
      );
      this.prom_gerentes.prom_planificacion_organizacion = parseFloat(
        (prom_planificacion_organizacion / counter).toFixed(1)
      );
      this.prom_gerentes.prom_orientacion_logro = parseFloat(
        (prom_orientacion_logro / counter).toFixed(1)
      );
      this.prom_gerentes.cantidad = datos_gerentes.length;
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
