<template>
  <div class="flex row justify-center" style="height:100%; width:100%">
    <!--<test></test>

    <vertical-bar></vertical-bar>-->

    <informe-personal></informe-personal>

    <!-- <doughnut-competencias class="q-my-xl"></doughnut-competencias>

    <horizontalbar-competencias></horizontalbar-competencias>

    <horizontalbar-ocupacional class="q-my-xl"></horizontalbar-ocupacional>

    <verticalbar-areas></verticalbar-areas>

    <doughnut-cumplimiento class="q-my-xl"></doughnut-cumplimiento>

    <doughnut-cumplimientoocupacion
      class="q-my-xl"
    ></doughnut-cumplimientoocupacion>

    <horizontalbar-objetivoarea class="q-my-xl"></horizontalbar-objetivoarea>

    <verticalbar-promedio class="q-my-xl"></verticalbar-promedio> -->
  </div>
</template>

<script>
// import Test from "components/Testing.vue";
import InformePersonal from "components/SP/InformePersonal.vue";
// import VerticalBar from "components/VerticalBar.vue";
// import VerticalBarPromedio from "components/SP/VerticalBarPromedio.vue";
// import HorizontalBarCompetencias from "components/SP/HorizontalBarCompetencias.vue";
// import HorizontalBarObjetivoArea from "components/SP/HorizontalBarObjetivoArea.vue";
// import DoughnutCumplimiento from "components/SP/DoughnutCumplimiento.vue";
// import DoughnutCumplimientoOcupacion from "components/SP/DoughnutCumplimientoOcupacion.vue";
// import DoughnutCompetencias from "components/SP/DoughnutCompetencias.vue";
// import HorizontalOcupacional from "components/SP/HorizontalOcupacional.vue";
// import VerticalBarAreas from "components/SP/VerticalBarAreas.vue";

export default {
  components: {
    // test: Test,
    "informe-personal": InformePersonal,
    // "vertical-bar": VerticalBar,
    // "horizontalbar-objetivoarea": HorizontalBarObjetivoArea,
    // "doughnut-cumplimiento": DoughnutCumplimiento,
    // "doughnut-cumplimientoocupacion": DoughnutCumplimientoOcupacion,
    // "horizontalbar-competencias": HorizontalBarCompetencias,
    // "doughnut-competencias": DoughnutCompetencias,
    // "horizontalbar-ocupacional": HorizontalOcupacional,
    // "verticalbar-areas": VerticalBarAreas,
    // "verticalbar-promedio": VerticalBarPromedio
  },
  data() {
    return {
      data_test: "hola"
    };
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
