<template>
  <div class="ds-error-message">[VueDataScreenerError]: {{ message }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
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
