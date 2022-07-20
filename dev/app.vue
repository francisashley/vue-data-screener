<script lang="ts">
import Vue from "vue";
import DataScreener from "@/DataScreener.vue";

export default Vue.extend({
  name: "ServeDev",
  components: {
    DataScreener,
  },
});
</script>

<template>
  <div id="app">
    <data-screener :withRawToggle="true" />
  </div>
</template>
