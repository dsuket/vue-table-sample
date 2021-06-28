<template>
  <div>
    <h1>Table Sample</h1>
    <SampleTable />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SampleTable from "@/components/SampleTable.vue";

@Component({
  components: {
    SampleTable,
  },
})
export default class TablePage extends Vue {}
</script>
