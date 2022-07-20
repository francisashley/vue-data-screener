<template>
  <table class="ds-table">
    <thead>
      <tr>
        <table-head-field
          v-for="(field, index) in fields"
          :key="index"
          :field="field"
          :sort-direction="getSortDirection(field)"
          @sort="onSort(field)"
        >
          {{ field }}
        </table-head-field>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, j) in getSortedRows" :key="j">
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
import { defineComponent, PropType } from "vue";
import { orderBy } from "natural-orderby";
import highlightText from "../utils/highlightText";
import TableHeadField from "./TableHeadField.vue";
import { normalisedRow } from "../utils/dataTools";

export default defineComponent({
  name: "DataScreenerTable",

  props: {
    fields: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    rows: {
      type: Array as PropType<normalisedRow[]>,
      default: () => [],
    },
    highlight: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      sortField: null as null | string,
      sortDirection: "desc" as "asc" | "desc",
    };
  },

  components: {
    TableHeadField,
  },

  computed: {
    getSortedRows(): normalisedRow[] {
      const rows = this.rows;

      const sortIndex =
        rows[0]?.findIndex((column) => column.key === this.sortField) ?? null;

      if (this.sortField && this.sortDirection) {
        return orderBy(
          rows,
          [(row: normalisedRow | null) => row?.[sortIndex]?.value],
          [this.sortDirection]
        );
      } else {
        return rows;
      }
    },
  },

  methods: {
    getHighlighted(value: unknown, highlight: string) {
      if (["string", "number"].includes(typeof value)) {
        return highlightText(String(value), highlight);
      }
      return value;
    },

    getSortDirection(field: string): "asc" | "desc" | null {
      if (this.sortField === field) {
        return this.sortDirection;
      }
      return null;
    },

    onSort(sortField: string) {
      if (this.sortField === sortField) {
        this.sortDirection = this.sortDirection === "desc" ? "asc" : "desc";
      }
      this.sortField = sortField;
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
