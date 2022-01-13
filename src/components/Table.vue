<template>
  <table class="ds-table">
    <thead>
      <tr>
        <td v-for="(field, index) in fields" :key="index">
          {{ field }}
        </td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, j) in rows" :key="j">
        <template v-if="row">
          <td
            v-for="(field, k) in row"
            :key="k"
            v-html="
              field.hasValue ? getHighlighted(field.value, highlight) : ''
            "
          />
        </template>
        <template v-else><td colspan="100%" /></template>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import highlightText from "../utils/highlightText";

export default Vue.extend({
  name: "DataScreenerTable",

  props: {
    fields: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    rows: {
      type: Array,
      default: () => [],
    },
    highlight: {
      type: String,
      default: "",
    },
  },

  methods: {
    getHighlighted(value: any, highlight: string) {
      if (["string", "number"].includes(typeof value)) {
        return highlightText(String(value), highlight);
      }
      return value;
    },
  },
});
</script>

<style scoped>
.ds-table {
  width: 100%;
  white-space: nowrap;
  border-bottom: thin solid #000;
  width: 100%;
  white-space: nowrap;
  border-collapse: collapse;
}

.ds-table thead {
  font-weight: bold;
}

.ds-table td {
  width: 0.1%;
  white-space: nowrap;
  padding: 2px 5px;
  height: 24px;
  box-sizing: border-box;
}

.ds-table td.title {
  width: 100%;
}

.ds-table td.thumbnail {
  padding: 0 !important;
  width: 140px;
}

.ds-table td.thumbnail img {
  height: 28px;
  width: 100%;
  object-fit: cover;
}

.ds table tr,
.ds table td {
  border: thin solid #000;
}

.ds-table thead tr td.thumbnail {
  padding-right: 0 !important;
}
</style>
