<template>
  <td
    class="ds-table-head-field"
    :class="{ 'ds-table-head-field--is-sortable': isSortable }"
    @click="isSortable && $emit('sort')"
  >
    <slot />
    <div v-if="isSortable" class="ds-table-head-field__sortable-icon">
      <icon v-if="sortDirection === null" name="sort" />
      <icon v-else-if="sortDirection === 'asc'" name="sort-up" />
      <icon v-else-if="sortDirection === 'desc'" name="sort-down" />
    </div>
  </td>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import Icon from "./Icon.vue";

type sortDirection = null | "asc" | "desc";

export default Vue.extend({
  name: "DataScreenerTable",

  props: {
    isSortable: { type: Boolean, default: true },
    sortDirection: { type: String as PropType<sortDirection>, default: null },
  },

  components: {
    Icon,
  },
});
</script>

<style lang="scss" scoped>
.ds-table-head-field {
  font-weight: bold;
  width: 0.1%;
  white-space: nowrap;
  padding: 2px 5px;
  height: 24px;
  box-sizing: border-box;

  &__sortable-icon {
    margin-left: auto;
    height: 24px;
    display: inline-flex;
    align-items: center;
    float: right;
  }

  &--is-sortable {
    cursor: pointer;
    user-select: none;
  }
}
</style>
