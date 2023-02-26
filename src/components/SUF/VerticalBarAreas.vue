<template>
  <div
    class="flex column items-center justify-center"
    style="height:100%; width:98%;max-width: 1800px;"
  >
    <button class="row flex justify-center" @click="handler = true">
      Test 3
    </button>
    <div
      class="row flex justify-center"
      :style="n == 6 || n == 19 ? 'height: 600px' : 'height: 500px'"
      style="width:100%;max-width: 1800px;margin: 32px 0px;"
      v-for="n in titulo_area.length"
      :key="n"
    >
      <vertical-bar
        :style="n == 6 || n == 19 ? 'height: 600px' : 'height: 500px'"
        style="width: 100%;max-width: 1800px;"
        :options="options[n - 1]"
        :chartData="datacollection[n - 1]"
      >
      </vertical-bar>
    </div>
  </div>
</template>

<script>
import VertitalBarChart from "components/Charts/VerticalBarChart.js";
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
    "vertical-bar": VertitalBarChart
  },
  data() {
    return {
      array_colores: [
        "#a2cadf",
        "#51d1f6",
        "#00aaea",
        "#12cadf",
        "#3b83bd",
        "#2271b3",
        "#1b5a8f",
        "#2271b3",
        "#0055dd"
      ],
      titulo_area: [
        "Frío"
      ],
      titulo_gráfica: [
        "Frío"
      ],
      labels_eje_x: [
        "Comunicación",
        "Liderazgo",
        ["Trabajo", "en equipo"],
        "Productividad",
        "Flexibilidad",
        "Iniciativa",
        ["Tolerancia", "a la presión"],
        ["Planificación", "y organización"],
        ["Orientación", "al logro"]
      ],
      labels: [
        "Comunicación",
        "Liderazgo",
        "Trabajo en equipo",
        "Productividad",
        "Flexibilidad",
        "Iniciativa",
        "Tolerancia a la presión",
        "Planificación y organización",
        "Orientación al logro"
      ],
      labels_competencias: [],
      labels_competencias_eje_x: [],
      backgroundColor: [],
      prom_administracion: {},
      prom_almacen: {},
      prom_backoffice: {},
      prom_calidad_seguridad: {},
      prom_comercial: {},
      prom_compras: {},
      prom_contabilidad: {},
      prom_finanzas: {},
      prom_frio: {},
      prom_gerencia: {},
      prom_hidraulica_movil: {},
      prom_hidraulica_terrestre: {},
      prom_ingenieria: {},
      prom_lubricacion_industrial: {},
      prom_lubricacion_mineria: {},
      prom_mangueras_conexiones: {},
      prom_marketing: {},
      prom_recursos_humanos: {},
      prom_sistemas: {},
      prom_sistemas_lubricacion: {},
      //
      tecnicos_por_area: [],
      asistentes_por_area: [],
      analistas_por_area: [],
      representantes_por_area: [],
      coordinadores_por_area: [],
      administradores_por_area: [],
      gerentes_por_area: [],
      results_average: [],
      handler: false,
      options: [],
      datacollection: []
    };
  },
  mounted() {
    //this.fillData();
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
    this.getCoordinadores();
    //administradores
    this.getAdministradores();
    //gerencia
    this.getGerencia();
  },
  methods: {
    getAverage() {
      this.results_average.length = 0;
      let datos_totales = [
        this.tecnicos_por_area,
        this.asistentes_por_area,
        this.analistas_por_area,
        this.representantes_por_area,
        this.coordinadores_por_area,
        this.administradores_por_area,
        this.gerentes_por_area
      ];
      let array_labels = [];
      let array_labels_eje_x = [];
      let array_color = [];
      let competencias = [
        "prom_comunicacion",
        "prom_liderazgo",
        "prom_trabajo_en_equipo",
        "prom_productividad",
        "prom_flexibilidad",
        "prom_iniciativa",
        "prom_tolerancia_presion",
        "prom_planificacion_organizacion",
        "prom_orientacion_logro"
      ];
      let prom_comunicacion = 0;
      let prom_liderazgo = 0;
      let prom_trabajo_en_equipo = 0;
      let prom_productividad = 0;
      let prom_flexibilidad = 0;
      let prom_iniciativa = 0;
      let prom_tolerancia_presion = 0;
      let prom_planificacion_organizacion = 0;
      let prom_orientacion_logro = 0;
      //
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
        counter_percentage[j] = 0;
        for (let i = 0; i <= datos_totales_usuarios.length - 1; i++) {
          for (let k = 0; k <= datos_totales_usuarios[i].length - 1; k++) {
            if (datos_totales_usuarios[i][k]["area"] === this.titulo_area[j]) {
              counter_percentage[j] = counter_percentage[j] + 1;
            }
          }
        }
      }
      let total = counter_percentage.reduce((a, b) => a + b, 0);
      for (let k = 0; k <= this.titulo_area.length - 1; k++) {
        percentage_per_area[k] = parseFloat(
          ((100 * counter_percentage[k]) / total).toFixed(1)
        );
      }

      //
      let counter = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (let j = 0; j <= this.titulo_area.length - 1; j++) {
        prom_comunicacion = 0;
        prom_liderazgo = 0;
        prom_trabajo_en_equipo = 0;
        prom_productividad = 0;
        prom_flexibilidad = 0;
        prom_iniciativa = 0;
        prom_tolerancia_presion = 0;
        prom_planificacion_organizacion = 0;
        prom_orientacion_logro = 0;
        counter = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i <= datos_totales.length - 1; i++) {
          prom_comunicacion = datos_totales[i][j][competencias[0]]
            ? datos_totales[i][j][competencias[0]] *
                datos_totales[i][j].counter +
              prom_comunicacion
            : prom_comunicacion;
          prom_liderazgo = datos_totales[i][j][competencias[1]]
            ? datos_totales[i][j][competencias[1]] *
                datos_totales[i][j].counter +
              prom_liderazgo
            : prom_liderazgo;
          prom_trabajo_en_equipo = datos_totales[i][j][competencias[2]]
            ? datos_totales[i][j][competencias[2]] *
                datos_totales[i][j].counter +
              prom_trabajo_en_equipo
            : prom_trabajo_en_equipo;
          prom_productividad = datos_totales[i][j][competencias[3]]
            ? datos_totales[i][j][competencias[3]] *
                datos_totales[i][j].counter +
              prom_productividad
            : prom_productividad;
          prom_flexibilidad = datos_totales[i][j][competencias[4]]
            ? datos_totales[i][j][competencias[4]] *
                datos_totales[i][j].counter +
              prom_flexibilidad
            : prom_flexibilidad;
          prom_iniciativa = datos_totales[i][j][competencias[5]]
            ? datos_totales[i][j][competencias[5]] *
                datos_totales[i][j].counter +
              prom_iniciativa
            : prom_iniciativa;
          prom_tolerancia_presion = datos_totales[i][j][competencias[6]]
            ? datos_totales[i][j][competencias[6]] *
                datos_totales[i][j].counter +
              prom_tolerancia_presion
            : prom_tolerancia_presion;
          prom_planificacion_organizacion = datos_totales[i][j][competencias[7]]
            ? datos_totales[i][j][competencias[7]] *
                datos_totales[i][j].counter +
              prom_planificacion_organizacion
            : prom_planificacion_organizacion;
          prom_orientacion_logro = datos_totales[i][j][competencias[8]]
            ? datos_totales[i][j][competencias[8]] *
                datos_totales[i][j].counter +
              prom_orientacion_logro
            : prom_orientacion_logro;
          for (let k = 0; k <= competencias.length - 1; k++) {
            counter[k] = datos_totales[i][j][competencias[k]]
              ? counter[k] + datos_totales[i][j].counter
              : counter[k];
          }
        }
        prom_comunicacion =
          counter[0] != 0
            ? parseFloat((prom_comunicacion / counter[0]).toFixed(1))
            : 0;
        prom_liderazgo =
          counter[1] != 0
            ? parseFloat((prom_liderazgo / counter[1]).toFixed(1))
            : 0;
        prom_trabajo_en_equipo =
          counter[2] != 0
            ? parseFloat((prom_trabajo_en_equipo / counter[2]).toFixed(1))
            : 0;
        prom_productividad =
          counter[3] != 0
            ? parseFloat((prom_productividad / counter[3]).toFixed(1))
            : 0;
        prom_flexibilidad =
          counter[4] != 0
            ? parseFloat((prom_flexibilidad / counter[4]).toFixed(1))
            : 0;
        prom_iniciativa =
          counter[5] != 0
            ? parseFloat((prom_iniciativa / counter[5]).toFixed(1))
            : 0;
        prom_tolerancia_presion =
          counter[6] != 0
            ? parseFloat((prom_tolerancia_presion / counter[6]).toFixed(1))
            : 0;
        prom_planificacion_organizacion =
          counter[7] != 0
            ? parseFloat(
                (prom_planificacion_organizacion / counter[7]).toFixed(1)
              )
            : 0;
        prom_orientacion_logro =
          counter[8] != 0
            ? parseFloat((prom_orientacion_logro / counter[8]).toFixed(1))
            : 0;
        this.results_average.push([
          prom_comunicacion,
          prom_liderazgo,
          prom_trabajo_en_equipo,
          prom_productividad,
          prom_flexibilidad,
          prom_iniciativa,
          prom_tolerancia_presion,
          prom_planificacion_organizacion,
          prom_orientacion_logro
        ]);
        array_color = [];
        array_labels = [];
        array_labels_eje_x = [];
        for (let z = 0; z <= this.results_average[j].length - 1; z++) {
          if (this.results_average[j][z] !== 0) {
            array_color.push(this.array_colores[z]);
            array_labels.push(this.labels[z]);
            array_labels_eje_x.push(this.labels_eje_x[z]);
          }
        }
        this.backgroundColor.push(array_color);
        this.labels_competencias.push(array_labels);
        this.labels_competencias_eje_x.push(array_labels_eje_x);
        this.results_average[j] = this.results_average[j].filter(
          value => value != 0
        );
      }
      //this.getData();
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
                  var label_to_show = data + "\n" + categorySelected;
                  return label_to_show;
                } else {
                  return null;
                }
                // eq. return ['line1', 'line2', value]
              }
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
                  fontSize: 22,
                  fontStyle: "bold"
                }
              }
            ],
            yAxes: [
              {
                ticks: {
                  min: 0,
                  max: 20,
                  fontSize: 22,
                  fontStyle: "bold",
                  stepSize: 4,
                  scaleFontSize: 40
                }
              }
            ]
          },
          title: {
            display: true,
            fontSize: 28,
            fontStyle: "bold",
            padding: 24,
            text: this.titulo_gráfica[i]
          },
          legend: {
            labels: {
              maxWidth: 500,
              //boxWidth: 10,
              fontSize: 16,
              fontStyle: "bold",
              fontColor: "black"
            },
            display: true
          },
          tooltips: {
            enabled: true
          },
          hover: {
            animationDuration: 0
          },
          layout: {
            /*padding: {
              left: 50,
              right: 50,
              top: 150,
              bottom: 50
            }*/
          },
          animation: {
            animateScale: true
            /*duration: 1,
            onComplete: function() {
              var chartInstance = this.chart,
                ctx = chartInstance.ctx;
              ctx.textAlign = "center";
              ctx.fillStyle = "rgba(0, 0, 0, 1)";
              ctx.textBaseline = "bottom";
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
                  var label_to_show = data + " - " + categorySelected;
                  console.log(chartInstance);
                  ctx.fillText(label_to_show, bar._model.x, bar._model.y - 5);
                });
              });
            }*/
          }
        });
        this.datacollection.push({
          labels: this.labels_competencias_eje_x[i],
          datasets: this.getValue(i)
        });
      }
    },
    array_data(value, index, length) {
      let my_array = new Array(length);
      for (let j = 0; j <= length; j++) {
        if (index == j) {
          my_array[j] = value;
        }
      }
      return my_array;
    },
    getValue(i) {
      let new_test = [];
      for (let j = 0; j <= this.results_average[i].length - 1; j++) {
        new_test.push({
          label: this.labels_competencias[i][j],
          backgroundColor: this.backgroundColor[i][j],
          data: this.array_data(
            this.results_average[i][j],
            j,
            this.results_average[i].length - 1
          )
        });
      }
      return new_test;
    },
    getTecnicos() {
      //tecnico
      let counter = 0;
      let prom_iniciativa = 0;
      let prom_trabajo_en_equipo = 0;
      let prom_productividad = 0;
      let prom_tolerancia_presion = 0;
      let prom_orientacion_logro = 0;
      let tecnico_per_area = [];
      let tecnico_object = {};
      for (let j = 0; j <= this.titulo_area.length - 1; j++) {
        counter = 0;
        tecnico_object = {};
        prom_iniciativa = 0;
        prom_trabajo_en_equipo = 0;
        prom_productividad = 0;
        prom_tolerancia_presion = 0;
        prom_orientacion_logro = 0;
        for (let i = 0; i <= datos_tecnicos.length - 1; i++) {
          if (datos_tecnicos[i].area == this.titulo_area[j]) {
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
        tecnico_object.counter = counter;
        tecnico_object.prom_iniciativa = counter
          ? parseFloat((prom_iniciativa / counter).toFixed(1))
          : 0;
        tecnico_object.prom_trabajo_en_equipo = counter
          ? parseFloat((prom_trabajo_en_equipo / counter).toFixed(1))
          : 0;
        tecnico_object.prom_productividad = counter
          ? parseFloat((prom_productividad / counter).toFixed(1))
          : 0;
        tecnico_object.prom_tolerancia_presion = counter
          ? parseFloat((prom_tolerancia_presion / counter).toFixed(1))
          : 0;
        tecnico_object.prom_orientacion_logro = counter
          ? parseFloat((prom_orientacion_logro / counter).toFixed(1))
          : 0;
        tecnico_per_area.push(tecnico_object);
      }
      this.tecnicos_por_area = tecnico_per_area;
    },
    getAsistentes() {
      let counter = 0;
      let prom_comunicacion = 0;
      let prom_iniciativa = 0;
      let prom_trabajo_en_equipo = 0;
      let prom_productividad = 0;
      let prom_tolerancia_presion = 0;
      let prom_orientacion_logro = 0;
      let asistente_per_area = [];
      let asistente_object = {};
      for (let j = 0; j <= this.titulo_area.length - 1; j++) {
        counter = 0;
        asistente_object = {};
        prom_comunicacion = 0;
        prom_iniciativa = 0;
        prom_trabajo_en_equipo = 0;
        prom_productividad = 0;
        prom_tolerancia_presion = 0;
        prom_orientacion_logro = 0;
        for (let i = 0; i <= datos_asistentes.length - 1; i++) {
          if (datos_asistentes[i].area == this.titulo_area[j]) {
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
        asistente_object.counter = counter;
        asistente_object.prom_comunicacion = counter
          ? parseFloat((prom_comunicacion / counter).toFixed(1))
          : 0;
        asistente_object.prom_iniciativa = counter
          ? parseFloat((prom_iniciativa / counter).toFixed(1))
          : 0;
        asistente_object.prom_trabajo_en_equipo = counter
          ? parseFloat((prom_trabajo_en_equipo / counter).toFixed(1))
          : 0;
        asistente_object.prom_productividad = counter
          ? parseFloat((prom_productividad / counter).toFixed(1))
          : 0;
        asistente_object.prom_tolerancia_presion = counter
          ? parseFloat((prom_tolerancia_presion / counter).toFixed(1))
          : 0;
        asistente_object.prom_orientacion_logro = counter
          ? parseFloat((prom_orientacion_logro / counter).toFixed(1))
          : 0;
        asistente_per_area.push(asistente_object);
      }
      this.asistentes_por_area = asistente_per_area;
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
      let analista_per_area = [];
      let analista_object = {};
      for (let j = 0; j <= this.titulo_area.length - 1; j++) {
        counter = 0;
        analista_object = {};
        prom_comunicacion = 0;
        prom_trabajo_en_equipo = 0;
        prom_productividad = 0;
        prom_flexibilidad = 0;
        prom_iniciativa = 0;
        prom_tolerancia_presion = 0;
        prom_planificacion_organizacion = 0;
        for (let i = 0; i <= datos_analistas.length - 1; i++) {
          if (datos_analistas[i].area == this.titulo_area[j]) {
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
        analista_object.counter = counter;
        analista_object.prom_comunicacion = counter
          ? parseFloat((prom_comunicacion / counter).toFixed(1))
          : 0;
        analista_object.prom_trabajo_en_equipo = counter
          ? parseFloat((prom_trabajo_en_equipo / counter).toFixed(1))
          : 0;
        analista_object.prom_productividad = counter
          ? parseFloat((prom_productividad / counter).toFixed(1))
          : 0;
        analista_object.prom_flexibilidad = counter
          ? parseFloat((prom_flexibilidad / counter).toFixed(1))
          : 0;
        analista_object.prom_iniciativa = counter
          ? parseFloat((prom_iniciativa / counter).toFixed(1))
          : 0;
        analista_object.prom_tolerancia_presion = counter
          ? parseFloat((prom_tolerancia_presion / counter).toFixed(1))
          : 0;
        analista_object.prom_planificacion_organizacion = counter
          ? parseFloat((prom_planificacion_organizacion / counter).toFixed(1))
          : 0;
        analista_per_area.push(analista_object);
      }
      this.analistas_por_area = analista_per_area;
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
      let representante_per_area = [];
      let representante_object = {};
      for (let j = 0; j <= this.titulo_area.length - 1; j++) {
        counter = 0;
        representante_object = {};
        prom_comunicacion = 0;
        prom_trabajo_en_equipo = 0;
        prom_productividad = 0;
        prom_iniciativa = 0;
        prom_tolerancia_presion = 0;
        prom_planificacion_organizacion = 0;
        prom_orientacion_logro = 0;
        for (let i = 0; i <= datos_representantes.length - 1; i++) {
          if (datos_representantes[i].area == this.titulo_area[j]) {
            counter = counter + 1;
            prom_comunicacion =
              prom_comunicacion +
              parseInt(datos_representantes[i].comunicacion);
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
        representante_object.counter = counter;
        representante_object.prom_comunicacion = counter
          ? parseFloat((prom_comunicacion / counter).toFixed(1))
          : 0;
        representante_object.prom_trabajo_en_equipo = counter
          ? parseFloat((prom_trabajo_en_equipo / counter).toFixed(1))
          : 0;
        representante_object.prom_productividad = counter
          ? parseFloat((prom_productividad / counter).toFixed(1))
          : 0;
        representante_object.prom_iniciativa = counter
          ? parseFloat((prom_iniciativa / counter).toFixed(1))
          : 0;
        representante_object.prom_tolerancia_presion = counter
          ? parseFloat((prom_tolerancia_presion / counter).toFixed(1))
          : 0;
        representante_object.prom_planificacion_organizacion = counter
          ? parseFloat((prom_planificacion_organizacion / counter).toFixed(1))
          : 0;
        representante_object.prom_orientacion_logro = counter
          ? parseFloat((prom_orientacion_logro / counter).toFixed(1))
          : 0;
        representante_per_area.push(representante_object);
      }
      this.representantes_por_area = representante_per_area;
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
      let coordinador_per_area = [];
      let coordinador_object = {};
      for (let j = 0; j <= this.titulo_area.length - 1; j++) {
        counter = 0;
        coordinador_object = {};
        prom_comunicacion = 0;
        prom_liderazgo = 0;
        prom_trabajo_en_equipo = 0;
        prom_productividad = 0;
        prom_flexibilidad = 0;
        prom_iniciativa = 0;
        prom_tolerancia_presion = 0;
        prom_planificacion_organizacion = 0;
        prom_orientacion_logro = 0;
        for (let i = 0; i <= datos_coordinadores.length - 1; i++) {
          if (datos_coordinadores[i].area == this.titulo_area[j]) {
            counter = counter + 1;
            prom_comunicacion =
              prom_comunicacion + parseInt(datos_coordinadores[i].comunicacion);
            prom_liderazgo =
              prom_liderazgo + parseInt(datos_coordinadores[i].liderazgo);
            prom_trabajo_en_equipo =
              prom_trabajo_en_equipo +
              parseInt(datos_coordinadores[i].trabajo_en_equipo);
            prom_productividad =
              prom_productividad +
              parseInt(datos_coordinadores[i].productividad);
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
        coordinador_object.counter = counter;
        coordinador_object.prom_comunicacion = counter
          ? parseFloat((prom_comunicacion / counter).toFixed(1))
          : 0;
        coordinador_object.prom_liderazgo = counter
          ? parseFloat((prom_liderazgo / counter).toFixed(1))
          : 0;
        coordinador_object.prom_trabajo_en_equipo = counter
          ? parseFloat((prom_trabajo_en_equipo / counter).toFixed(1))
          : 0;
        coordinador_object.prom_productividad = counter
          ? parseFloat((prom_productividad / counter).toFixed(1))
          : 0;
        coordinador_object.prom_flexibilidad = counter
          ? parseFloat((prom_flexibilidad / counter).toFixed(1))
          : 0;
        coordinador_object.prom_iniciativa = counter
          ? parseFloat((prom_iniciativa / counter).toFixed(1))
          : 0;
        coordinador_object.prom_tolerancia_presion = counter
          ? parseFloat((prom_tolerancia_presion / counter).toFixed(1))
          : 0;
        coordinador_object.prom_planificacion_organizacion = counter
          ? parseFloat((prom_planificacion_organizacion / counter).toFixed(1))
          : 0;
        coordinador_object.prom_orientacion_logro = counter
          ? parseFloat((prom_orientacion_logro / counter).toFixed(1))
          : 0;
        coordinador_per_area.push(coordinador_object);
      }
      this.coordinadores_por_area = coordinador_per_area;
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
      let administrador_per_area = [];
      let administrador_object = {};
      for (let j = 0; j <= this.titulo_area.length - 1; j++) {
        counter = 0;
        administrador_object = {};
        prom_comunicacion = 0;
        prom_liderazgo = 0;
        prom_trabajo_en_equipo = 0;
        prom_productividad = 0;
        prom_flexibilidad = 0;
        prom_iniciativa = 0;
        prom_tolerancia_presion = 0;
        prom_planificacion_organizacion = 0;
        prom_orientacion_logro = 0;
        for (let i = 0; i <= datos_administradores.length - 1; i++) {
          if (datos_administradores[i].area == this.titulo_area[j]) {
            counter = counter + 1;
            prom_comunicacion =
              prom_comunicacion +
              parseInt(datos_administradores[i].comunicacion);
            prom_liderazgo =
              prom_liderazgo + parseInt(datos_administradores[i].liderazgo);
            prom_trabajo_en_equipo =
              prom_trabajo_en_equipo +
              parseInt(datos_administradores[i].trabajo_en_equipo);
            prom_productividad =
              prom_productividad +
              parseInt(datos_administradores[i].productividad);
            prom_flexibilidad =
              prom_flexibilidad +
              parseInt(datos_administradores[i].flexibilidad);
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
        administrador_object.counter = counter;
        administrador_object.prom_comunicacion = counter
          ? parseFloat((prom_comunicacion / counter).toFixed(1))
          : 0;
        administrador_object.prom_liderazgo = counter
          ? parseFloat((prom_liderazgo / counter).toFixed(1))
          : 0;
        administrador_object.prom_trabajo_en_equipo = counter
          ? parseFloat((prom_trabajo_en_equipo / counter).toFixed(1))
          : 0;
        administrador_object.prom_productividad = counter
          ? parseFloat((prom_productividad / counter).toFixed(1))
          : 0;
        administrador_object.prom_flexibilidad = counter
          ? parseFloat((prom_flexibilidad / counter).toFixed(1))
          : 0;
        administrador_object.prom_iniciativa = counter
          ? parseFloat((prom_iniciativa / counter).toFixed(1))
          : 0;
        administrador_object.prom_tolerancia_presion = counter
          ? parseFloat((prom_tolerancia_presion / counter).toFixed(1))
          : 0;
        administrador_object.prom_planificacion_organizacion = counter
          ? parseFloat((prom_planificacion_organizacion / counter).toFixed(1))
          : 0;
        administrador_object.prom_orientacion_logro = counter
          ? parseFloat((prom_orientacion_logro / counter).toFixed(1))
          : 0;
        administrador_per_area.push(administrador_object);
      }
      this.administradores_por_area = administrador_per_area;
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
      let gerente_per_area = [];
      let gerente_object = {};
      for (let j = 0; j <= this.titulo_area.length - 1; j++) {
        counter = 0;
        gerente_object = {};
        prom_comunicacion = 0;
        prom_liderazgo = 0;
        prom_trabajo_en_equipo = 0;
        prom_productividad = 0;
        prom_flexibilidad = 0;
        prom_iniciativa = 0;
        prom_tolerancia_presion = 0;
        prom_planificacion_organizacion = 0;
        prom_orientacion_logro = 0;
        for (let i = 0; i <= datos_gerentes.length - 1; i++) {
          if (datos_gerentes[i].area == this.titulo_area[j]) {
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
        gerente_object.counter = counter;
        gerente_object.prom_comunicacion = counter
          ? parseFloat((prom_comunicacion / counter).toFixed(1))
          : 0;
        gerente_object.prom_liderazgo = counter
          ? parseFloat((prom_liderazgo / counter).toFixed(1))
          : 0;
        gerente_object.prom_trabajo_en_equipo = counter
          ? parseFloat((prom_trabajo_en_equipo / counter).toFixed(1))
          : 0;
        gerente_object.prom_productividad = counter
          ? parseFloat((prom_productividad / counter).toFixed(1))
          : 0;
        gerente_object.prom_flexibilidad = counter
          ? parseFloat((prom_flexibilidad / counter).toFixed(1))
          : 0;
        gerente_object.prom_iniciativa = counter
          ? parseFloat((prom_iniciativa / counter).toFixed(1))
          : 0;
        gerente_object.prom_tolerancia_presion = counter
          ? parseFloat((prom_tolerancia_presion / counter).toFixed(1))
          : 0;
        gerente_object.prom_planificacion_organizacion = counter
          ? parseFloat((prom_planificacion_organizacion / counter).toFixed(1))
          : 0;
        gerente_object.prom_orientacion_logro = counter
          ? parseFloat((prom_orientacion_logro / counter).toFixed(1))
          : 0;
        gerente_per_area.push(gerente_object);
      }
      this.gerentes_por_area = gerente_per_area;
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
