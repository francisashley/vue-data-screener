<template>
  <div class="ds-error-message">[VueDataScreenerError]: {{ message }}</div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "DataScreenerErrorMessage",

  props: {
    message: {
      type: String,
      default: "",
    },
  },
});
</script>

<style scoped>
.ds-error-message {
  border: thin solid red;
  color: red;
}
</style>
