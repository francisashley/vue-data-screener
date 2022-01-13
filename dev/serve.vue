<script lang="ts">
import Vue from "vue";
import DemoButton from "@/DemoButton.vue";

export default Vue.extend({
  name: "ServeDev",
  components: {
    DemoButton,
  },
});
</script>

<template>
  <div id="app">
    <demo-button />
  </div>
</template>
