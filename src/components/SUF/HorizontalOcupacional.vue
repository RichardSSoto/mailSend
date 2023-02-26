<template>
  <div class="flex row justify-center" style="height:80%; width:80%">
    <div class="flex row justify-center" style="width: 100%;margin: 32px 0px;">
      <button @click="handler = true">Test competencias por ocupacion</button>
    </div>
    <div
      class="column flex items-center"
      v-for="n in label_per_grupo.length"
      :key="n"
      style="height:80%; width:100%;margin: 32px 0px;"
    >
      <horizontal-bar
        style="width: 680px;height: 500px;"
        :options="options[n - 1]"
        :chartData="datacollection[n - 1]"
      >
      </horizontal-bar>
    </div>
  </div>
</template>

<script>
import HorizontalBar from "components/Charts/HorizontalBarChart.js";
import datos_asistentes from "../../DatosSUF/datos_asistentes.json";
import datos_analistas from "../../DatosSUF/datos_analistas.json";
import datos_coordinadores from "../../DatosSUF/datos_coordinadores.json";
import datos_representantes from "../../DatosSUF/datos_representantes.json";
import datos_gerentes from "../../DatosSUF/datos_gerencia.json";
import datos_administradores from "../../DatosSUF/datos_administradores.json";
import datos_tecnicos from "../../DatosSUF/datos_tecnicos.json";
import ChartDataLabels from "chartjs-plugin-datalabels";

export default {
  components: {
    "horizontal-bar": HorizontalBar
  },
  data() {
    return {
      label_per_grupo: [
        [
          "Trabajo en equipo",
          "Productividad",
          "Iniciativa",
          "Tolerancia a la presión",
          "Orientación al logro"
        ],
        [
          "Comunicación",
          "Trabajo en equipo",
          "Productividad",
          "Iniciativa",
          "Tolerancia a la presión",
          "Orientación al logro"
        ],
        [
          "Comunicación",
          "Trabajo en equipo",
          "Productividad",
          "Iniciativa",
          "Tolerancia a la presión",
          "Planificación y organización",
          "Orientación al logro"
        ],
        [
          "Comunicación",
          "Trabajo en equipo",
          "Productividad",
          "Flexibilidad",
          "Iniciativa",
          "Tolerancia a la presión",
          "Planificación y organización"
        ],
        // [
        //   "Comunicación",
        //   "Liderazgo",
        //   "Trabajo en equipo",
        //   "Productividad",
        //   "Flexibilidad",
        //   "Iniciativa",
        //   "Tolerancia a la presión",
        //   "Planificación y organización",
        //   "Orientación al logro"
        // ],
        [
          "Comunicación",
          "Liderazgo",
          "Trabajo en equipo",
          "Productividad",
          "Flexibilidad",
          "Iniciativa",
          "Tolerancia a la presión",
          "Planificación y organización",
          "Orientación al logro"
        ]
        // [
        //   "Comunicación",
        //   "Liderazgo",
        //   "Trabajo en equipo",
        //   "Productividad",
        //   "Flexibilidad",
        //   "Iniciativa",
        //   "Tolerancia a la presión",
        //   "Planificación y organización",
        //   "Orientación al logro"
        // ]
      ],
      prom_tecnicos: {},
      prom_asistentes: {},
      // prom_gerentes: {},
      prom_analistas: {},
      prom_representantes: {},
      // prom_coordinadores: {},
      prom_administradores: {},
      promedio_total: {},
      results_avarage: [],
      handler: false,
      options: [],
      datacollection: [],
      title: [
        "                                       Promedio - Grupo Ocupacional - Técnicos",
        "                                       Promedio - Grupo Ocupacional - Asistentes",
        "                                       Promedio - Grupo Ocupacional - Rep. Comercial",
        "                                       Promedio - Grupo Ocupacional - Analistas",
        // "                                       Promedio - Grupo Ocupacional - Coordinadores",
        "                                       Promedio - Grupo Ocupacional - Administradores",
        // "                                       Promedio - Grupo Ocupacional - Gerente de área"
      ]
    };
  },
  watch: {
    handler: {
      handler(newVal) {
        this.getAverage();
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
    // this.getCoordinadores();
    //administradores
    this.getAdministradores();
    //gerencia
    // this.getGerencia();
  },
  methods: {
    getAverage() {
      this.results_avarage.length = 0;
      let datos_totales = [
        this.prom_tecnicos,
        this.prom_asistentes,
        this.prom_representantes,
        this.prom_analistas,
        // this.prom_coordinadores,
        this.prom_administradores,
        // this.prom_gerentes
      ];
      for (let i = 0; i <= datos_totales.length - 1; i++) {
        let data_por_grupo = datos_totales[i];
        delete data_por_grupo.cantidad;
        this.results_avarage.push(data_por_grupo);
      }
      console.log(datos_totales)
      this.fillData();
    },
    fillData() {
      this.datacollection.length = 0;
      for (let i = 0; i <= 6; i++) {
        this.options.push({
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            datalabels: {
              textAlign: "center",
              font: {
                size: 17,
                lineHeight: 1.3,
                weight: "bold"
              },
              anchor: "center",
              align: function() {
                return "center";
              },
              color: function() {
                return "black";
              },
              formatter: function(value) {
                if (value) {
                  let filter_categorias_value = [
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
                  ];
                  var categorySelected = "";
                  var data = value;
                  categorySelected = filter_categorias_value
                    .filter(x => data >= x.min_value && data <= x.max_value)
                    .map(x => x.name)
                    .shift();
                  var label_to_show = data + " - " + categorySelected;
                  return label_to_show;
                } else {
                  return null;
                }
                // eq. return ['line1', 'line2', value]
              }
            }
          },
          scales: {
            xAxes: [
              {
                ticks: {
                  min: 0,
                  max: 20,
                  stepSize: 4,
                  scaleFontSize: 40,
                  fontStyle: "bold",
                  fontColor: "#000",
                  fontSize: 20
                }
              }
            ],
            yAxes: [
              {
                stacked: true,
                ticks: {
                  fontSize: 22,
                  fontStyle: "bold",
                  fontColor: "#000"
                }
              }
            ]
          },
          title: {
            display: true,
            padding: 30,
            fontSize: 22,
            fontColor: "#000",
            text: this.title[i]
          },
          legend: { display: false },
          tooltips: {
            enabled: true
          },
          hover: {
            animationDuration: 1
          },
          animation: {
            duration: 1
            /*onComplete: function() {
              var chartInstance = this.chart,
                ctx = chartInstance.ctx;
              ctx.textAlign = "center";
              ctx.fillStyle = "rgba(0, 0, 0, 1)";
              ctx.textBaseline = "center";
              this.data.datasets.forEach(function(dataset, i) {
                var meta = chartInstance.controller.getDatasetMeta(i);
                meta.data.forEach(function(bar, index) {
                  let filter_categorias_value = [
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
                  ];
                  var categorySelected = "";
                  var data = dataset.data[index];
                  categorySelected = filter_categorias_value
                    .filter(x => data >= x.min_value && data <= x.max_value)
                    .map(x => x.name)
                    .shift();
                  ctx.fillText(
                    data + " - " + categorySelected,
                    0.7 * bar._model.x,
                    bar._model.y + 5
                  );
                });
              });
            }*/
          }
        });
        this.datacollection.push({
          labels: this.label_per_grupo[i],
          datasets: [
            {
              //maxBarThickness: 20,
              //barPercentage: 1,
              backgroundColor: [
                "#A9D18E",
                "#A9D18E",
                "#A9D18E",
                "#A9D18E",
                "#A9D18E",
                "#A9D18E",
                "#A9D18E",
                "#A9D18E",
                "#A9D18E"
              ],
              data: Object.values(this.results_avarage[i])
            }
          ]
        });
      }
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
