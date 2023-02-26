<template>
  <div
    class="flex row justify-center items-center"
    style="min-width: 1200px;width: 100%"
  >
    <div
      class="flex column justify-center items-center"
      style="width: 100%;margin: 0px 0px 16px;"
    >
      <div
        class="flex row justify-center items-center"
        style="margin: 16px 0px;"
      >
        <button @click="savePhoto()">Descargar PDF</button>
      </div>
      <q-input
        outlined
        class="q-mb-md"
        v-model="nombre_evaluador"
        label="Nombre del evaluador"
      />
      <q-select
        outlined
        v-model="nombre_trabajador"
        :options="name_options"
        label="Nombre"
      />
    </div>

    <div
      ref="capture"
      class="flex row justify-center items-center"
      style="width: 1000px;margin-top: 10px;"
    >
      <div class="flex row justify-center items-center" style="width: 100%;">
        <span
          class="row"
          style="font-family: 'Bookman Old Style';font-size: 22px;font-weight: 700;color: #002060;"
          >Resultados de Evaluación de Desempeño</span
        >
      </div>
      <div
        class="flex column justify-center items-center"
        style="width: 100%;margin: 20px 0px 0px;"
      >
        <span
          class="row"
          style="font-family: 'Bookman Old Style';font-size: 18px;font-weight: 400;color: #002060;"
          >Con el objetivo de seguir mejorando, a través del siguiente
          formulario,te presentamos tu
        </span>
        <span
          class="row"
          style="font-family: 'Bookman Old Style';font-size: 18px;font-weight: 400;color: #002060;text-decoration: underline;"
          >Evaluación de Desempeño – 2022</span
        >
      </div>
      <div
        class="flex row justify-between items-start"
        style="width: 100%;margin: 40px 0px 40px 0px;"
      >
        <div
          class="flex column items-start justify-center"
          style="width: auto;"
        >
          <q-list>
            <q-item class="flex row items-center">
              <q-item-section
                style="font-family: 'Book Antiqua';font-size: 16px;font-weight: 700;color: #002060;display: inline-block;"
              >
                Nombre :
                <span
                  class="text-capitalize"
                  style="font-size: 18px;font-weight: 400;color: black;:"
                  >{{ trabajador.nombre }}</span
                >
              </q-item-section>
            </q-item>
            <q-separator spaced inset />
            <q-item>
              <q-item-section
                style="font-family: 'Book Antiqua';font-size: 16px;font-weight: 700;color: #002060;display: inline-block;"
              >
                Cargo :
                <span style="font-size: 18px;font-weight: 400;color: black;:">{{
                  trabajador.cargo
                }}</span>
              </q-item-section>
            </q-item>
            <q-separator spaced inset />
            <q-item>
              <q-item-section
                style="font-family: 'Book Antiqua';font-size: 16px;font-weight: 700;color: #002060;display: inline-block;"
              >
                Grupo Ocupacional :
                <span style="font-size: 18px;font-weight: 400;color: black;"
                >{{trabajador.grupo_ocupasional | obtenerGrupoOcupacional(labels_ocupacion)}}</span>
              </q-item-section>
            </q-item>
            <q-separator spaced inset />
            <q-item>
              <q-item-section
                style="font-family: 'Book Antiqua';font-size: 16px;font-weight: 700;color: #002060;display: inline-block;"
              >
                Evaluado por :
                <span style="font-size: 18px;font-weight: 400;color: black;:">{{
                  nombre_evaluador
                }}</span>
              </q-item-section>
            </q-item>
          </q-list>
        </div>

        <q-separator
          style="padding: 0px;background-color:#002060;"
          vertical
          inset
        />

        <div
          class="flex column items-start justify-center"
          style="width: auto;"
        >
          <q-list>
            <q-item>
              <q-item-section
                style="font-family: 'Book Antiqua';font-size: 20px;font-weight: 700;color: #002060;"
                align="center"
              >
                COMPETENCIAS
              </q-item-section>
            </q-item>
            <div v-for="(label, index) in competencias_labels" :key="index">
              <q-item v-if="trabajador[label.value]">
                <q-item-section
                  style="font-family: 'Book Antiqua';font-size: 16px;font-weight: 700;color: #002060;display: inline-block;"
                >
                  {{ label.label | UpperCase }} :
                  <span
                    style="font-size: 18px;font-weight: 400;color: black;"
                    >{{trabajador[label.value] | category_filter(filter_categorias_value)}}</span>
                </q-item-section>
              </q-item>
              <q-separator
                v-if="
                  index != competencias_labels.length && trabajador[label.value]
                "
                spaced
                inset
              />
            </div>
          </q-list>
          <div
            class="flex column justify-center items-center"
            style="width:100%;"
          >
            <q-item>
              <q-item-section
                style="font-family: 'Book Antiqua';font-size: 20px;font-weight: 700;color: #002060;"
                align="center"
              >
                CUMPLIMIENTO DE OBJETIVOS
              </q-item-section>
            </q-item>
            <q-item class="flex row items-center">
              <q-item-section
                style="font-family: 'Book Antiqua';font-size: 18px;font-weight: 400;color: black;"
                align="center"
              >
                "{{ trabajador.categoria_objetivo }}"
              </q-item-section>
            </q-item>
          </div>
        </div>
      </div>
      <div class="flex row justify-start items-center" style="width:100%;">
        <q-item>
          <q-item-section
            style="font-family: 'Book Antiqua';font-size: 20px;font-weight: 700;color: #002060;display: inline-block;"
          >
            RETROALIMENTACIÓN :
            <span
              style="font-size: 18px;font-weight: 400;color: black;margin-left: 4px;"
              >"{{
                trabajador.feedback_comentario !== ""
                  ? trabajador.feedback_comentario
                  : "No recibio ningun comentario"
              }}"</span
            >
          </q-item-section>
        </q-item>
      </div>
      <div
        class="flex row justify-center items-center"
        style="width:100%;margin: 40px 0px;"
      >
        <div
          class="row justify-center flex"
          style="width: 100%;margin: 20px 0px;font-family: 'Book Antiqua';font-size: 20px;font-weight: 700;color: #002060;"
        >
          PROMEDIO ENTRE COMPETENCIAS Y CUMPLIMIENTO DE OBJETIVOS
        </div>
        <div
          class="row flex justify-center"
          style="width:100%;max-width: 800px;height: 400px;margin: 20px 0px;"
        >
          <radar-chart
            style="width: 100%;max-width: 800px;height: 400px;"
            :options="options"
            :chartData="datacollection"
          >
          </radar-chart>
          <div
            class="flex column justify-start items-center"
            style="margin: -200px 0px 0px 480px;"
          >
            <div class="elipse flex row justify-center items-center">
              <span
                style="color: red;font-size: 22px;font-weight: 900;-webkit-transform: scaleY(2.5);"
                >{{ trabajador | promedioGeneral }}</span
              >
            </div>
            <div
              class="flex row justify-center items-center"
              style="margin: -40px 0px 0px 0px;"
            >
              <span style="color: red;font-size: 22px;font-weight: 900;">
                {{trabajador | promedioGeneral | category_filter(filter_categorias_value)}}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import RadarChart from "components/Charts/RadarChart.js";
import datos_asistentes from "../../DatosRMWT/datos_asistentes.json";
import datos_analistas from "../../DatosRMWT/datos_analistas.json";
import datos_coordinadores from "../../DatosRMWT/datos_coordinadores.json";
import datos_representantes from "../../DatosRMWT/datos_representantes.json";
import datos_gerentes from "../../DatosRMWT/datos_gerencia.json";
import datos_administradores from "../../DatosRMWT/datos_administradores.json";
import datos_tecnicos from "../../DatosRMWT/datos_tecnicos.json";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export default {
  components: {
    "radar-chart": RadarChart
  },
  data() {
    return {
      name_options: [],
      nombre_trabajador: "Nombre del trabajor",
      trabajador: {},
      options: {},
      datacollection: {},
      datos_totales: [],
      nombre_evaluador: "",
      labels_ocupacion: [
        "Gerente",
        "Administrador",
        "Coordinador",
        "Analista",
        "Representante Comercial",
        "Asistente",
        "Técnico"
      ],
      competencias_labels: [
        {
          label: "Comunicación",
          value: "comunicacion"
        },
        {
          label: "Liderazgo",
          value: "liderazgo"
        },
        {
          label: "Trabajo en equipo",
          value: "trabajo_en_equipo"
        },
        {
          label: "Productividad",
          value: "productividad"
        },
        {
          label: "Flexibilidad",
          value: "flexibilidad"
        },
        {
          label: "Iniciativa",
          value: "iniciativa"
        },
        {
          label: "Tolerancia a la presión",
          value: "tolerancia_presion"
        },
        {
          label: "Planificación y organización",
          value: "planificacion_organizacion"
        },
        {
          label: "Orientación al logro",
          value: "orientacion_logro"
        }
      ],
      categorias_labels: [
        "Destacado",
        "Bueno",
        "Necesita Mejorar",
        "Por debajo de lo esperado"
      ],
      output: "",
      logo_image:"",
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
  watch: {
    nombre_trabajador: {
      handler(newVal) {
        if (newVal != "Nombre del trabajador") {
          this.trabajador = this.datos_totales.filter(
            value => value.nombre == newVal
          )[0];
          this.trabajador.feedback_comentario = this.primeraMayuscula(
            this.trabajador.feedback_comentario
          );
          this.trabajador.nombre = this.trabajador.nombre.toLowerCase();
          this.trabajador.cargo = this.primeraMayuscula(
            this.trabajador.cargo.toLowerCase()
          );
          this.fillData();
        }
      }
    }
  },
  mounted() {
    this.logo_image = require("../../assets/Logo_RMWT.png");
    let nombre_trabajadores = [];
    let datos_totales_usuarios = [
      datos_tecnicos,
      datos_asistentes,
      datos_representantes,
      datos_analistas,
      datos_coordinadores,
      datos_administradores,
      datos_gerentes
    ];
    for (let i = 0; i <= datos_totales_usuarios.length - 1; i++) {
      for (let j = 0; j <= datos_totales_usuarios[i].length - 1; j++) {
        this.datos_totales.push(datos_totales_usuarios[i][j]);
        nombre_trabajadores.push(datos_totales_usuarios[i][j].nombre);
      }
    }
    this.name_options = nombre_trabajadores;
    this.fillData();
  },
  methods: {
    primeraMayuscula(value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    savePhoto() {
      this.downloadVisualReport();
    },
    downloadVisualReport() {
      let filename = "Reporte de " + this.nombre_trabajador + ".png";
      html2canvas(this.$refs.capture)
        .then(canvas => {
          this.output = canvas.toDataURL("image/png");
          let doc = new jsPDF("p", "mm");
          doc.addImage(this.output, "PNG", 12.5, 20, 180, 240);
          doc.addImage(this.logo_image, "PNG", 10, 0, 45, 25);
          doc.save("Reporte de " + this.nombre_trabajador + ".pdf");
        })
        .catch(error => {
          console.log(error)
          alert("Error descargando el reporte visual");
        });
    },
    fillData() {
      this.datacollection = {
        labels: [
          "Cumplimiento de Objetivos",
          "Promedio general",
          "Competencias"
        ],
        datasets: [
          {
            borderWidth: 0,
            backgroundColor: 'rgba(68,114,196,0.8)',
            //borderColor: ["rgba(0,125,255,1)"],
            label: "Resultado general del trabajador",
            data: [
              this.trabajador.nota_objetivo,
              (parseInt(this.trabajador.nota_objetivo) +
                parseInt(this.trabajador.nota_competencia)) *
                0.5,
              this.trabajador.nota_competencia
            ]
          }
        ]
      };
      this.options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          datalabels: {
            display: false
          }
        },
        legend: {
          position: "top",
          labels: {
            verticalAlign: "center",
            horizontalAlign: "center",
            maxWidth: 100,
            fontSize: 16
          },
          display: true
        },
        scale: {
          angleLines: {
            display: false
          },
          ticks: {
            display: false,
            suggestedMin: 10,
            suggestedMax: 20
          },
          pointLabels: {
            fontSize: 22,
            fontColor: ["#ED7D31", "#ff0000", "#FFC000"]
          }
        },
        elements: {
          point: {
            radius: 4
          }
        },
        tooltips: {
          enabled: true
        },
        hover: {
          animationDuration: 0
        },
        animation: {
          duration: 1,
          onComplete: function() {
            var chartInstance = this.chart,
              ctx = chartInstance.ctx;
            ctx.textAlign = "center";
            ctx.fillStyle = "red";
            ctx.textBaseline = "center";
            this.data.datasets.forEach(function(dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function(bar, index) {
                var data = dataset.data[index];
                ctx.fillText(data, bar._model.x, bar._model.y - 10);
              });
            });
          }
        }
      };
    }
  },
  filters: {
    promedioGeneral: value => {
      return (
        0.5 *
        (
          parseInt(value.nota_objetivo) + parseInt(value.nota_competencia)
        ).toFixed(1)
      );
    },
    obtenerGrupoOcupacional: (value, labels) => {
      return labels[value - 1];
    },
    category_filter: (value, filtro) => {
      let categorySelected = "";
      let nota = value;
      categorySelected = filtro
        .filter(x => nota >= x.min_value && nota <= x.max_value)
        .map(x => x.name)
        .shift();
      return categorySelected;
    },
    UpperCase: value => {
      return value.toUpperCase();
    }
  }
};
</script>
<style>
.elipse {
  width: 100px;
  height: 125px;
  border-radius: 50%;
  background: rgba(68,114,196,0.8);
  -moz-transform: scaleY(0.4);
  -webkit-transform: scaleY(0.4);
}
</style>
