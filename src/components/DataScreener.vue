<template>
  <section class="ds">
    <ErrorMessage
      v-if="!isValidInput"
      message="Invalid data was provided. Please provide an
      array of objects or an array of arrays."
    />
    <template v-else>
      <Header>
        <div class="ds__title">Results</div>
        <RenderFormat
          class="ds__render-format"
          :active-format="renderFormat"
          @select-format="onSelectFormat"
        />
        <Search
          class="ds__search"
          :query="searchQuery"
          :is-valid-query="isRegExFriendlySearchQuery"
          :activeOptions="searchQueryOptions"
          @search="onSearch"
          @update-options="onUpdateOptions"
        />
      </Header>
      <Content>
        <Table
          v-if="renderFormat === 'table'"
          :fields="getFields"
          :rows="getPaginatedData"
          :highlight="searchQuery"
        />
        <PrettyJson v-else :data="getPaginatedData" />
      </Content>
      <Footer>
        <Pagination
          :total-items="getSearchedData.length"
          :per-page="perPage"
          :current-page="stagedCurrentPage"
          @change-page="onChangePage"
        />
      </Footer>
    </template>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import PrettyJson from "./PrettyJson.vue";
import Pagination from "./Pagination.vue";
import Table from "./Table.vue";
import Header from "./layout/Header.vue";
import Content from "./layout/Content.vue";
import Footer from "./layout/Footer.vue";
import RenderFormat from "./RenderFormat.vue";
import Search from "./Search.vue";
import { searchQueryOption } from "./Search";
import ErrorMessage from "./ErrorMessage.vue";
import isValidRegExp from "../utils/isValidRegExp";
import dataTools, { normalisedRow, UnknownObject } from "../utils/dataTools";

export default defineComponent({
  name: "DataScreener",

  props: {
    data: {
      type: Array as PropType<unknown[]>,
      default: () => [],
      validator: dataTools.isValidInput,
    },
    pickFields: {
      type: Array as PropType<string[]>,
      default: () => [],
      validator: (pickFields: string[]) => {
        return pickFields.every((field) => typeof field === "string");
      },
    },
    perPage: {
      type: Number as PropType<number>,
      default: 25,
    },
    currentPage: {
      type: Number as PropType<number>,
      default: 1,
    },
  },

  components: {
    PrettyJson,
    Pagination,
    Table,
    Header,
    Content,
    Footer,
    RenderFormat,
    Search,
    ErrorMessage,
  },

  data() {
    return {
      searchQuery: "" as string,
      stagedCurrentPage: this.currentPage as number,
      renderFormat: "table" as "table" | "json",
      searchQueryOptions: [] as searchQueryOption[],
      searchedData: [],
    };
  },

  computed: {
    isValidInput(): boolean {
      return dataTools.isValidInput(this.data);
    },

    isRegExFriendlySearchQuery(): boolean {
      return isValidRegExp(this.searchQuery);
    },

    getNormalisedData(): normalisedRow[] {
      const data = dataTools.isValidInput(this.data)
        ? dataTools.normaliseInput(this.data as UnknownObject[])
        : [];

      if (this.pickFields.length > 0) {
        return dataTools.pickFields(data, this.pickFields);
      }

      return data;
    },

    getFields(): string[] {
      return dataTools.getFields(this.getNormalisedData);
    },

    shouldUseRegEx(): boolean {
      return this.searchQueryOptions.includes("use-regex");
    },

    shouldMatchCase(): boolean {
      return this.searchQueryOptions.includes("match-case");
    },

    shouldMatchWord(): boolean {
      return this.searchQueryOptions.includes("match-word");
    },

    getSearchedData(): normalisedRow[] {
      return dataTools.search({
        rows: this.getNormalisedData,
        searchQuery: this.searchQuery,
        useRegExp: this.shouldUseRegEx,
        matchCase: this.shouldMatchCase,
        matchWord: this.shouldMatchWord,
      });
    },

    getPaginatedData(): unknown[] {
      return dataTools.getPaginated({
        rows: this.searchQuery ? this.getSearchedData : this.getNormalisedData,
        page: this.stagedCurrentPage - 1,
        perPage: this.perPage,
        withPlaceholders: true,
      });
    },
  },

  methods: {
    onSearch(query: string) {
      this.searchQuery = query;
    },

    onUpdateOptions(options: searchQueryOption[]) {
      this.searchQueryOptions = options;
      this.onSearch(this.searchQuery);
    },

    onSelectFormat(format: 'table' | 'json') {
      this.renderFormat = format;
    },

    onChangePage(page: number) {
      this.stagedCurrentPage = page;
    }
  },
});
</script>

<style>
.ds {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 14px;
}

.ds__title {
  font-weight: 500;
  margin-right: auto;
}

.ds__render-format {
  margin-left: auto;
}

.ds__search {
  margin-left: 8px;
}
</style>
