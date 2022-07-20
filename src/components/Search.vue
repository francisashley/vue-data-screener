<template>
  <div class="ds-search">
    <input
      :value="query"
      @input="debouncedSearch($event.target.value)"
      @keydown="onKeydown"
      type="text"
      class="ds-search__search"
      :class="[useRegEx && !isValidQuery && 'ds-search__search--error']"
      placeholder="Search (↑↓ for history)"
    />
    <div class="ds-search__options">
      <button
        v-for="(option, i) in getOptions"
        :key="i"
        class="ds-search__options-button"
        :class="[
          { 'ds-search__options-button--active': option.isActive },
          'ds-search__options-button--' + option.id,
        ]"
        :title="option.title"
        @click="toggleOption(option.id)"
      >
        {{ option.text }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { searchQueryOption } from "./Search";

const OPTIONS = new Set(["match-case", "match-word", "use-regex"]);

type searchQueryInternalOption = {
  id: searchQueryOption;
  title: string;
  text: string;
  isActive?: boolean;
};

export default defineComponent({
  name: "DataScreenerSearch",
  props: {
    query: {
      type: String,
      default: "",
    },
    isValidQuery: {
      type: Boolean,
      default: true,
    },
    activeOptions: {
      type: Array as PropType<Array<searchQueryOption>>,
      default: () => [],
      validator: (options) => options.every((option) => OPTIONS.has(option)),
    },
  },
  data() {
    return {
      history: [] as string[],
      historyIndex: null as number | null,
      options: [
        { id: "match-case", title: "Match case", text: "Aa" },
        { id: "match-word", title: "Match word", text: "ab" },
        { id: "use-regex", title: "Use regular expression", text: ".*" },
      ] as searchQueryInternalOption[],
    };
  },
  computed: {
    useRegEx(): boolean {
      return this.activeOptions.some(
        (activeOption) => activeOption === "use-regex"
      );
    },
    getOptions(): searchQueryInternalOption[] {
      return this.options.map((option: searchQueryInternalOption) => ({
        ...option,
        isActive: this.activeOptions.includes(option.id),
      }));
    },
  },
  methods: {
    debouncedSearch(searchQuery: string): void {
      this.search(searchQuery);
      if (searchQuery) {
        this.history.push(searchQuery);
        this.historyIndex = this.history.length - 1;
      }
    },

    onKeydown(e: KeyboardEvent) {
      const isPressingUp = e.key === "ArrowUp";
      const isPressingDown = e.key === "ArrowDown";

      if ((!isPressingUp && !isPressingDown) || this.historyIndex === null) {
        return;
      }

      // prevent the cursor moving to the start of the line when pressing up
      e.preventDefault();

      if (isPressingUp && this.historyIndex > 0) {
        this.historyIndex--;
      } else if (
        isPressingDown &&
        this.historyIndex < this.history.length - 1
      ) {
        this.historyIndex++;
      }

      this.search(this.history[this.historyIndex]);
    },

    search(searchQuery: string): void {
      this.$emit("search", searchQuery);
    },

    toggleOption(option: searchQueryOption) {
      let activeOptions = this.activeOptions;
      if (activeOptions.includes(option)) {
        activeOptions = activeOptions.filter(
          (activeOption) => activeOption !== option
        );
      } else {
        activeOptions = [...activeOptions, option];
      }
      this.$emit("update-options", activeOptions);
    },
  },
});
</script>

<style>
.ds-search {
  position: relative;
}

.ds-search__search {
  width: 300px;
  padding: 0 84px 0 6px;
  box-sizing: border-box;
  font-size: 14px !important;
  font-weight: normal !important;
  height: 30px;
  border: none;
  border-left: thin solid;
  border-radius: 2px;
  border: 2px solid #fff;
}

.ds-search__search--error {
  border: 2px solid red;
  outline-color: red;
}

.ds-search__options {
  display: flex;
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
}

.ds-search__options-button {
  border: none;
  background: none;
  padding: 0 3px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  height: 24px;
  border-radius: 2px;
  width: 24px;
  margin-left: 2px;
}

.ds-search__options-button--match-word {
  text-decoration: underline;
}

.ds-search__options-button:not(.ds-search__options-button--active):hover {
  background: rgba(0, 0, 0, 0.1);
}

.ds-search__options-button--active {
  color: #fff;
  background: #3e51b5;
}
</style>
