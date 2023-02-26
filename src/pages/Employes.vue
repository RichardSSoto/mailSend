<template>
  <q-page
    style="margin: 32px 0px"
    class="flex column items-center justify-center"
  >
    <div class="row justify-center container" style="width: 100%;">
      <employes-table></employes-table/>
    </div>

  </q-page>
</template>

<script>

import EmployesTable from "components/EmployesTable";

export default {
  components: {
    "employes-table": EmployesTable
  },
}
</script>

<style>

</style>