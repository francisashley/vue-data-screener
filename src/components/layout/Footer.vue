<template>
  <footer class="ds-footer">
    <slot />
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DataScreenerFooter",
});
</script>

<style scoped>
.ds-footer {
  border-bottom: thin solid;
  border-left: thin solid;
  border-right: thin solid;
  padding: 8px;
}
</style>
