<template>
  <main class="ds-content">
    <slot />
  </main>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "DataScreenerContent",
});
</script>
