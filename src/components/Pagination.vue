<template>
  <div class="ds-pagination">
    <ul v-if="pages.length > 1" class="ds-pagination__buttons">
      <li
        v-for="page in pages"
        :key="page"
        class="ds-pagination__buttons-button"
        :class="isActive(page) && 'ds-pagination__buttons-button--active'"
      >
        <a href="#" @click.prevent="selectPage(page)">{{ page }}</a>
      </li>
    </ul>
    <div class="ds-pagination__details">
      <template v-if="!totalItems">Showing 0 results</template>
      <template v-else-if="lastIndexOfCurrentPage < perPage">
        Showing {{ lastIndexOfCurrentPage }} of {{ totalItems }}
      </template>
      <template v-else>
        Showing {{ firstIndexOfCurrentPage }}-{{ lastIndexOfCurrentPage }}
        of
        {{ totalItems }}
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "DataScreenerPagination",

  props: {
    currentPage: {
      type: Number as PropType<number>,
      default: 1,
    },
    totalItems: {
      type: Number as PropType<number>,
      default: null,
      required: true,
    },
    perPage: {
      type: Number as PropType<number>,
      default: null,
      required: true,
    },
  },

  computed: {
    totalPages(): number {
      return Math.ceil(this.totalItems / this.perPage);
    },

    pages(): number[] {
      return Array.from(new Array(this.totalPages + 1).keys()).slice(1);
    },

    firstIndexOfCurrentPage() {
      return this.currentPage * this.perPage - this.perPage + 1;
    },

    lastIndexOfCurrentPage() {
      return this.currentPage * this.perPage > this.totalItems
        ? this.totalItems
        : this.currentPage * this.perPage;
    },

    currentPageIsInRange(): boolean {
      return this.totalPages >= this.currentPage;
    },
  },

  mounted() {
    this.ensureCurrentPageIsValid();
  },

  watch: {
    totalItems() {
      this.ensureCurrentPageIsValid();
    },
  },

  methods: {
    isActive(page: number): boolean {
      return page === this.currentPage;
    },

    ensureCurrentPageIsValid(): void {
      if (!this.currentPageIsInRange) {
        this.selectPage(this.totalPages ? this.totalPages : 1);
      }
    },

    selectPage(page: number): void {
      this.$emit("change-page", page);
    },
  },
});
</script>

<style scoped>
.ds-pagination {
  display: flex;
}

.ds-pagination__buttons {
  display: flex;
  flex-wrap: wrap;
  padding: 0 !important;
  margin: 0 !important;
  list-style-type: none;
}

.ds-pagination__buttons-button {
  margin: 0 10px 0 0 !important;
}

.ds-pagination__buttons-button a {
  text-decoration: none;
}

.ds-pagination__buttons-button--active a {
  color: #000 !important;
}

.ds-pagination__details {
  margin-left: auto;
  white-space: nowrap;
}
</style>
