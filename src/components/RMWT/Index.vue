<template>
  <div class="flex row justify-center" style="height:100%; width:100%">
    <!--<test></test>

    <vertical-bar></vertical-bar>-->

    <informe-personal></informe-personal>

  </div>
</template>

<script>

import InformePersonal from "components/RMWT/InformePersonal.vue";


export default {
  components: {
    "informe-personal": InformePersonal
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