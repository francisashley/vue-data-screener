<script lang="ts">
import Vue from "vue";
import DataScreener from "@/components/DataScreener.vue";

export default Vue.extend({
  name: "ServeDev",
  components: {
    DataScreener,
  },
});
</script>

<template>
  <div id="app">
    <data-screener />
  </div>
</template>
