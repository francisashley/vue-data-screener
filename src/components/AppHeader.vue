<template>
  <header class="ds-header">
    <slot />
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DataScreenerHeader",
});
</script>

<style>
.ds-header {
  display: flex;
  align-items: center;
  font-size: 16px;
  color: white;
  background: black;
  font-weight: 400;
  padding: 8px;
}
</style>
