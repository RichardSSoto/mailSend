<template>
  <div class="q-py-md">
    <div class="row flex justify-center q-mb-md">
      <button @click="downloadVisualReport()">Descargar PDF</button>
    </div>
    <div
      style="max-width: 600px;margin: 24px auto;"
    >
      <q-select
        outlined
        v-model="filter_razon_social"
        :options="razon_social_options"
        label="Razón Social"
      />
    </div>
    <div class="row flex justify-between q-mb-md q-mx-md">
      <div class="q-gutter-sm">
        <q-checkbox v-model="filters_competencia.excelente" label="Excelente" />
      </div>
      <div class="q-gutter-sm">
        <q-checkbox v-model="filters_competencia.destacado" label="Destacado" />
      </div>
      <div class="q-gutter-sm">
        <q-checkbox v-model="filters_competencia.cumple" label="Cumple" />
      </div>
      <div class="q-gutter-sm">
        <q-checkbox v-model="filters_competencia.cumple_parcialmente" label="Cumple Parcialmente" />
      </div>
      <div class="q-gutter-sm">
        <q-checkbox v-model="filters_competencia.debajo_lo_esperado" label="Debajo de lo esperado" />
      </div>
    </div>
    <q-table
      title="Trabajadores"
      :data="employes_data"
      :columns="columns"
      row-key="name"
    />
  </div>
</template>

<script>

//Data MP
import datos_asistentes_MP from "./../DatosMP/datos_asistentes.json";
import datos_analistas_MP from "./../DatosMP/datos_analistas.json";
import datos_coordinadores_MP from "./../DatosMP/datos_coordinadores.json";
import datos_representantes_MP from "./../DatosMP/datos_representantes.json";
import datos_gerentes_MP from "./../DatosMP/datos_gerencia.json";
import datos_administradores_MP from "./../DatosMP/datos_administradores.json";
import datos_tecnicos_MP from "./../DatosMP/datos_tecnicos.json";

//Data SP
import datos_asistentes_SP from "./../DatosSP/datos_asistentes.json";
import datos_analistas_SP from "./../DatosSP/datos_analistas.json";
import datos_coordinadores_SP from "./../DatosSP/datos_coordinadores.json";
import datos_representantes_SP from "./../DatosSP/datos_representantes.json";
import datos_gerentes_SP from "./../DatosSP/datos_gerencia.json";
import datos_administradores_SP from "./../DatosSP/datos_administradores.json";
import datos_tecnicos_SP from "./../DatosSP/datos_tecnicos.json";

//Data SUF
import datos_asistentes_SUF from "./../DatosSUF/datos_asistentes.json";
import datos_analistas_SUF from "./../DatosSUF/datos_analistas.json";
import datos_coordinadores_SUF from "./../DatosSUF/datos_coordinadores.json";
import datos_representantes_SUF from "./../DatosSUF/datos_representantes.json";
import datos_gerentes_SUF from "./../DatosSUF/datos_gerencia.json";
import datos_administradores_SUF from "./../DatosSUF/datos_administradores.json";
import datos_tecnicos_SUF from "./../DatosSUF/datos_tecnicos.json";

//Data DAFO
import datos_asistentes_DAFO from "./../DatosDAFO/datos_asistentes.json";
import datos_analistas_DAFO from "./../DatosDAFO/datos_analistas.json";
import datos_coordinadores_DAFO from "./../DatosDAFO/datos_coordinadores.json";
import datos_representantes_DAFO from "./../DatosDAFO/datos_representantes.json";
import datos_gerentes_DAFO from "./../DatosDAFO/datos_gerencia.json";
import datos_administradores_DAFO from "./../DatosDAFO/datos_administradores.json";
import datos_tecnicos_DAFO from "./../DatosDAFO/datos_tecnicos.json";

//Data RMWT
import datos_asistentes_RMWT from "./../DatosRMWT/datos_asistentes.json";
import datos_analistas_RMWT from "./../DatosRMWT/datos_analistas.json";
import datos_coordinadores_RMWT from "./../DatosRMWT/datos_coordinadores.json";
import datos_representantes_RMWT from "./../DatosRMWT/datos_representantes.json";
import datos_gerentes_RMWT from "./../DatosRMWT/datos_gerencia.json";
import datos_administradores_RMWT from "./../DatosRMWT/datos_administradores.json";
import datos_tecnicos_RMWT from "./../DatosRMWT/datos_tecnicos.json";

import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import 'jspdf-autotable';


export default {
  data () {
    return {
      filters_competencia: {
        excelente: true,
        destacado: true,
        cumple: true,
        cumple_parcialmente: true,
        debajo_lo_esperado: true,
      },
      razon_social_options: [
        'All',
        'MP',
        'SP',
        'SUF',
        'DAFO',
        'RMWT'
      ],
      filter_razon_social: 'All',
      columns: [
        {
          name: 'index',
          label: 'N°',
          field: 'index',
          align: 'center'
        },
        {
          name: 'nombre',
          required: true,
          label: 'Nombre',
          align: 'center',
          field: row => row.nombre,
          // field: 'nombre',
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'cargo',
          align: 'center',
          label: 'Ocupación',
          field: 'cargo',
          sortable: true
        },
        {
          name: 'area',
          align: 'center',
          label: 'Area',
          field: 'area'
        },
        {
          name: 'nota_competencia',
          align: 'center',
          label: 'Nota Competencia',
          field: 'nota_competencia',
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },
        {
          name: 'nota_objetivo',
          align: 'center',
          label: 'Nota Objetivo',
          field: 'nota_objetivo',
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },
        {
          name: 'nivel_alcanzado',
          align: 'center',
          label: 'Nivel Alcanzado',
          field: 'nivel_alcanzado',
          sorteable: true
        },
        {
          name: 'razon_social',
          align: 'center',
          label: 'Razón Social',
          field: 'razon_social'
        },
      ],
      datos_MP: [],
      datos_SP: [],
      datos_SUF: [],
      datos_DAFO: [],
      datos_RMWT: [],
      datos_totales_usuarios: [],
      employes_data: [],
      output: "",
      logo_image:""
    }
  },
  watch: {
    filter_razon_social: {
      handler(newVal) {
        if(newVal == 'All') {
          this.employes_data.length = 0;
          let filtered_data = [];
          let data_excelente = this.datos_totales_usuarios.flat().flat().filter(x => x.nota_competencia == 19);
          let data_destacado = this.datos_totales_usuarios.flat().flat().filter(x => x.nota_competencia == 17);
          let data_cumple = this.datos_totales_usuarios.flat().flat().filter(x => x.nota_competencia == 15);
          let data_cumple_parcialmente = this.datos_totales_usuarios.flat().flat().filter(x => x.nota_competencia == 13);
          let data_debajo_lo_esperado = this.datos_totales_usuarios.flat().flat().filter(x => x.nota_competencia == 11);
          if(this.filters_competencia.excelente === true) {
            filtered_data.push(data_excelente)
          }
          if(this.filters_competencia.destacado === true) {
            filtered_data.push(data_destacado)
          }
          if(this.filters_competencia.cumple === true) {
            filtered_data.push(data_cumple)
          }
          if(this.filters_competencia.cumple_parcialmente === true){
            filtered_data.push(data_cumple_parcialmente)
          }
          if(this.filters_competencia.debajo_lo_esperado === true) {
            filtered_data.push(data_debajo_lo_esperado)
          }
          this.employes_data = filtered_data.flat();
          this.employes_data.forEach((row, index) => {
            row.index = index + 1
          })
        }
        else {
          this.employes_data.length = 0;
          let filtered_data = [];
          let data_excelente = this.datos_totales_usuarios.flat().flat().filter(x => x.nota_competencia == 19).filter(x => x.razon_social == newVal);
          let data_destacado = this.datos_totales_usuarios.flat().flat().filter(x => x.nota_competencia == 17).filter(x => x.razon_social == newVal);
          let data_cumple = this.datos_totales_usuarios.flat().flat().filter(x => x.nota_competencia == 15).filter(x => x.razon_social == newVal);
          let data_cumple_parcialmente = this.datos_totales_usuarios.flat().flat().filter(x => x.nota_competencia == 13).filter(x => x.razon_social == newVal);
          let data_debajo_lo_esperado = this.datos_totales_usuarios.flat().flat().filter(x => x.nota_competencia == 11).filter(x => x.razon_social == newVal);
          if(this.filters_competencia.excelente === true) {
            filtered_data.push(data_excelente)
          }
          if(this.filters_competencia.destacado === true) {
            filtered_data.push(data_destacado)
          }
          if(this.filters_competencia.cumple === true) {
            filtered_data.push(data_cumple)
          }
          if(this.filters_competencia.cumple_parcialmente === true){
            filtered_data.push(data_cumple_parcialmente)
          }
          if(this.filters_competencia.debajo_lo_esperado === true) {
            filtered_data.push(data_debajo_lo_esperado)
          }
          this.employes_data = filtered_data.flat();
          this.employes_data.forEach((row, index) => {
            row.index = index + 1
          })
        };
      }
    },
    filters_competencia: {
      deep: true,
      handler(newVal) {
        this.employes_data.length = 0;
        let filtered_data = [];
        let data_excelente;
        let data_destacado;
        let data_cumple;
        let data_cumple_parcialmente;
        let data_debajo_lo_esperado;

        if(this.filter_razon_social !== 'All') {
          data_excelente = this.datos_totales_usuarios.flat().flat().filter(x => x.nota_competencia == 19).filter(x => x.razon_social == this.filter_razon_social);
          data_destacado = this.datos_totales_usuarios.flat().flat().filter(x => x.nota_competencia == 17).filter(x => x.razon_social == this.filter_razon_social);
          data_cumple = this.datos_totales_usuarios.flat().flat().filter(x => x.nota_competencia == 15).filter(x => x.razon_social == this.filter_razon_social);
          data_cumple_parcialmente = this.datos_totales_usuarios.flat().flat().filter(x => x.nota_competencia == 13).filter(x => x.razon_social == this.filter_razon_social);
          data_debajo_lo_esperado = this.datos_totales_usuarios.flat().flat().filter(x => x.nota_competencia == 11).filter(x => x.razon_social == this.filter_razon_social);
        }
        else {
          data_excelente = this.datos_totales_usuarios.flat().flat().filter(x => x.nota_competencia == 19);
          data_destacado = this.datos_totales_usuarios.flat().flat().filter(x => x.nota_competencia == 17);
          data_cumple = this.datos_totales_usuarios.flat().flat().filter(x => x.nota_competencia == 15)
          data_cumple_parcialmente = this.datos_totales_usuarios.flat().flat().filter(x => x.nota_competencia == 13)
          data_debajo_lo_esperado = this.datos_totales_usuarios.flat().flat().filter(x => x.nota_competencia == 11)
        }
        if(newVal.excelente === true) {
          filtered_data.push(data_excelente)
        }
        if(newVal.destacado === true) {
          filtered_data.push(data_destacado)
        }
        if(newVal.cumple === true) {
          filtered_data.push(data_cumple)
        }
        if(newVal.cumple_parcialmente === true){
          filtered_data.push(data_cumple_parcialmente)
        }
        if(newVal.debajo_lo_esperado === true) {
          filtered_data.push(data_debajo_lo_esperado)
        }
        this.employes_data = filtered_data.flat();
        this.employes_data.forEach((row, index) => {
          row.index = index + 1
        })
      }
    }
  },
  mounted() {
    this.logo_image = require("../assets/Logo_MP.png");
  },
  methods: {
    generatePdf() {

      const doc = new jsPDF();

      doc.autoTable({
        styles: {
          // fillColor: [255, 0, 0]
          halign: 'center',
          valign: 'middle',
          lineWidth: 0.25,
        },
        // columnStyles: { 0: { halign: 'center', fillColor: [0, 255, 0] } },
        // margin: { top: 10 },
        // columnStyles: {
        //   europe: { halign: 'center' }
        // },
        bodyStyles: {
          minCellHeight: 21
        },
        columns: [
          { header: 'N°', dataKey: 'index' },
          { header: 'Nombre', dataKey: 'nombre' },
          { header: 'Ocupación', dataKey: 'cargo' },
          { header: 'Área', dataKey: 'area' },
          { header: 'Nota Competencia', dataKey: 'nota_competencia' },
          { header: 'Nota Objetivo', dataKey: 'nota_objetivo' },
          { header: 'Nivel Alcanzado', dataKey: 'nivel_alcanzado' },
          { header: 'Razón Social', dataKey: 'razon_social' }
        ],
        body: this.employes_data
      })
      doc.save(this.getNamePDF());
    },
    getNamePDF(){
      let joined_string_level = "";
      if(this.filters_competencia.excelente === true) {
        joined_string_level = ' excelente'
      }
      if(this.filters_competencia.destacado === true) {
        joined_string_level = joined_string_level == "" ? joined_string_level = ' destacado' : joined_string_level + ' y destacado'
      }
      if(this.filters_competencia.cumple === true) {
        joined_string_level = joined_string_level == "" ? joined_string_level = ' cumple' : joined_string_level + ' y cumple'
      }
      if(this.filters_competencia.cumple_parcialmente === true){
        joined_string_level = joined_string_level == "" ? joined_string_level = ' cumple parcialmente' : joined_string_level + ' y cumple parcialmente'
      }
      if(this.filters_competencia.debajo_lo_esperado === true) {
        joined_string_level = joined_string_level == "" ? joined_string_level = ' debajo_lo_esperado' : joined_string_level + ' y debajo de lo esperado'
      }
      if(joined_string_level == " excelente y destacado y cumple y cumple parcialmente y debajo de lo esperado") {
        joined_string_level = " de todos los niveles";
      }
      else {
        joined_string_level = joined_string_level.includes('y') ? " de niveles" + joined_string_level : " de nivel" + joined_string_level
        joined_string_level = joined_string_level.split("y").length - 1 > 1 ? joined_string_level.replace(' y ',' , ') : joined_string_level;
      }
      let string_razon_social = this.filter_razon_social == "All" || this.filter_razon_social === null ? "todas las razones sociales" : this.filter_razon_social
      return "Reporte de Empleados de " + string_razon_social + joined_string_level + ".pdf";
    },
    downloadVisualReport() {
      this.generatePdf();
      // html2canvas(this.$refs.capture_table)
      //   .then(canvas => {
      //     this.output = canvas.toDataURL("image/png");
      //     let doc = new jsPDF("p", "mm", 'a4');
      //     doc.canvas.height = 72;
      //     doc.canvas.width = 72;
      //     let imgWidth = 210;
      //     let pageHeight = 295;
      //     let imgHeight = canvas.height * imgWidth / canvas.width;
      //     let heightLeft = imgHeight;
      //     let position = 0;
      //     doc.addImage(this.output, "PNG", 0, position, imgWidth, imgHeight);
      //     heightLeft -= pageHeight;
      //     while (heightLeft >= 0) {
      //       position = heightLeft - imgHeight;
      //       doc.addPage();
      //       doc.addImage(this.output, 'PNG', 0, position, imgWidth, imgHeight);
      //       heightLeft -= pageHeight;
      //     }
      //     // doc.addImage(this.logo_image, "PNG", 10, 0, 37.5, 25);
      //     doc.save("Reporte de Empleados.pdf");
      //   })
      //   .catch(error => {
      //     console.log(error)
      //     alert("Error descargando el reporte visual");
      //   });
    },
  },
  created() {
    let datos_MP = [
      datos_tecnicos_MP,
      datos_asistentes_MP,
      datos_representantes_MP,
      datos_analistas_MP,
      datos_coordinadores_MP,
      datos_administradores_MP,
      datos_gerentes_MP
    ];
    let datos_SP = [
      datos_tecnicos_SP,
      datos_asistentes_SP,
      datos_representantes_SP,
      datos_analistas_SP,
      datos_coordinadores_SP,
      datos_administradores_SP,
      datos_gerentes_SP
    ];
    let datos_SUF = [
      datos_tecnicos_SUF,
      datos_asistentes_SUF,
      datos_representantes_SUF,
      datos_analistas_SUF,
      datos_coordinadores_SUF,
      datos_administradores_SUF,
      datos_gerentes_SUF
    ];
    let datos_DAFO = [
      datos_tecnicos_DAFO,
      datos_asistentes_DAFO,
      datos_representantes_DAFO,
      datos_analistas_DAFO,
      datos_coordinadores_DAFO,
      datos_administradores_DAFO,
      datos_gerentes_DAFO
    ];
    let datos_RMWT = [
      datos_tecnicos_RMWT,
      datos_asistentes_RMWT,
      datos_representantes_RMWT,
      datos_analistas_RMWT,
      datos_coordinadores_RMWT,
      datos_administradores_RMWT,
      datos_gerentes_RMWT
    ];
    this.datos_MP = datos_MP;
    this.datos_SP = datos_SP;
    this.datos_SUF = datos_SUF;
    this.datos_DAFO = datos_DAFO;
    this.datos_RMWT = datos_RMWT;
    let datos_totales_usuarios = [
      datos_MP,
      datos_SP,
      datos_SUF,
      datos_DAFO,
      datos_RMWT
    ];
    this.datos_totales_usuarios = datos_totales_usuarios;
    this.employes_data = datos_totales_usuarios.flat().flat();
    this.employes_data.forEach((row, index) => {
      row.index = index + 1;
      if(row.nota_competencia == 19) {
        row.nivel_alcanzado = "Excelente"
      }
      if(row.nota_competencia == 17) {
        row.nivel_alcanzado = "Destacado"
      }
      if(row.nota_competencia == 15) {
        row.nivel_alcanzado = "Cumple"
      }
      if(row.nota_competencia == 13) {
        row.nivel_alcanzado = "Cumple Parcialmente"
      }
      if(row.nota_competencia == 11) {
        row.nivel_alcanzado = "Debajo de lo Esperado"
      }
    })
  },
}
</script>
