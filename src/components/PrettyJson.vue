<template>
  <pre class="ds-pretty">{{ JSON.stringify(data, null, 2) }}</pre>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DataScreenerPrettyJson",

  props: {
    data: {
      type: [Array, Object],
      default: () => [],
    },
  },
});
</script>

<style scoped>
.ds-pretty {
  font-size: 12px;
  background: #f7f7f7;
  margin: 0;
  padding: 10px;
  border: thin solid;
}
</style>
