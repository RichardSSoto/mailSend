<template>
  <div
    class="flex column items-center justify-center"
    style="height:100%; width:98%;max-width: 1800px;"
  >
    <div class="legend-con" v-html="message"></div>
    <line-chart @generated="setLegend"></line-chart>
  </div>
</template>

<script>
import LineChart from "components/Charts/LineChart.js";

export default {
  components: {
    "line-chart": LineChart
  },
  data() {
    return {
      message: "Hello World"
    };
  },
  methods: {
    setLegend(html) {
      this.message = html;
    }
  }
};
</script>

<style scope>
.legend-con {
  font-family: Roboto;
  display: inline-block;
}
.legend-con.ul {
  list-style: none;
}
.legend-con.li {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}
.legend-con.li.span {
  display: inline-block;
}
.legend-con.li.span.chart-legend {
  width: 25px;
  height: 25px;
  margin-right: 10px;
}
</style>
