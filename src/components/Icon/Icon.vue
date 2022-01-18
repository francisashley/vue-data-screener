<template>
  <component
    :is="iconComponent"
    role="img"
    class="inline-block fill-current"
    :style="getStyle"
  />
</template>

<script lang="ts">
import Vue from "vue";
import snakeCase from "lodash/snakeCase";

const icons = {
  sort: () => import("./icons/Sort.vue"),
  sort_up: () => import("./icons/SortUp.vue"),
  sort_down: () => import("./icons/SortDown.vue"),
} as { [key: string]: () => Promise<unknown> };

export default Vue.extend({
  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: "1em",
    },
  },

  computed: {
    getName(): string {
      return snakeCase(this.name);
    },
    iconComponent(): unknown {
      return icons[this.getName];
    },
    getStyle(): string {
      return `height: ${this.size}; width: ${this.size};`;
    },
  },
});
</script>
