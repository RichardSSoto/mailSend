<template>
  <q-page
    style="margin: 32px 0px"
    class="flex column items-center justify-center"
  >
    <div class="row justify-center container" style="width: 100vw;">
      <suf-graphs></suf-graphs>
    </div>
    <!--
    <logout></logout>
    <login></login>
    -->
  </q-page>
</template>

<script>
//import VerticalBar from "components/VerticalBar";
import SufGraphs from "components/SUF/Index";
//import secondchart from "components/MySecondChart.vue";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export default {
  data() {
    return {
      razon_social: "suf",
      output: null,
      name: "jaen",
      datacollection: null,
      loaded: false,
      temperature: [],
      humidity: [],
      potentio: [],
      time: []
    };
  },
  name: "PageIndex",
  components: {
    //"vertical-bar": VerticalBar
    "suf-graphs": SufGraphs,
    //"second-chart": secondchart
  },
  methods: {
    savePhoto() {
      this.downloadVisualReport();
    },
    showCaptureRef() {
      console.log(this.$refs.capture);
    },
    downloadVisualReport() {
      let filename = "Reporte de " + this.name + ".png";
      html2canvas(this.$refs.capture)
        .then(canvas => {
          this.output = canvas.toDataURL("image/png");
          console.log(canvas.toDataURL("image/png"));
          let doc = new jsPDF("p", "mm");
          doc.addImage(this.output, "PNG", 0, 0);
          doc.save("sample-file.pdf");
        })
        .catch(error => {
          alert("Error descargando el reporte visual");
        });
    }
  }
};
</script>

<style>
.container {
  width: 595px;
  height: auto;
}
</style>