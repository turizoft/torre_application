<script>
import Vue from 'vue/dist/vue.esm';
import { debounce } from 'debounce';
import { addUUIDToCollection } from 'scripts/helpers/helpers';
import vClickOutside from 'v-click-outside';
import BaseImage from 'scripts/components/base_image';

export default {
  directives: {
    clickOutside: vClickOutside.directive,
  },

  components: {
    'base-image': BaseImage,
  },

  props: {
    placeholder: { type: String, default: 'Search' },
    min_length: { type: Number, default: 2 },
    remote_route: { type: String, default: undefined },
    on_select_result: { type: Function, default: undefined },
    disabled: Boolean,
  },

  data() {
    return {
      value: '',
      results: [],
      open: false,
      searching: false,
    };
  },

  computed: {
    can_search() {
      return this.value && this.value.length >= this.min_length;
    },
  },

  watch: {
    value: 'onChangeValue',
  },

  methods: {
    onChangeValue() {
      if (!this.can_search) {
        this.results = [];
      } else {
        this.openDropDown();
        this.searching = true;
        this.searchRemotely(this.value);
      }
    },

    searchRemotely: debounce(async function (query) {
      try {
        const request_options = {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: { term: query } }),
        };
        const response = await fetch(this.remote_route, request_options);
        const data = await response.json();
        this.results = data.results;
        addUUIDToCollection(this.results);
        this.searching = false;
      } catch {
        Vue.$toast.open({ message: 'Error while performing search', type: 'error', position: 'top' });
      }
    }, 600),

    onSelectResult(result) {
      this.on_select_result?.(result);
      this.value = '';
      this.results = [];
      this.closeDropDown();
    },

    openDropDown() {
      this.open = true;
    },

    closeDropDown() {
      this.open = false;
    },
  },
};
</script>

<template>
  <div v-click-outside="closeDropDown" class="flex flex-col relative scrollbar-sm">
    <div class="relative">
      <!-- textfield -->
      <input
        v-model="value"
        class="tw-text-field tw-text-field-md pr-10"
        role="combobox"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        aria-autocomplete="list"
        aria-haspopup="listbox"
        aria-owns="todo: insert resultlist id"
        :aria-expanded="open"
        :aria-label="placeholder"
        :placeholder="placeholder"
        :disabled="disabled"
        data-autocomplete
        @focus="openDropDown"
      />

      <!-- loader -->
      <div class="absolute right-0 inset-y-0 w-10 z-10 flex items-center justify-center text-gray-400">
        <svg
          v-if="searching"
          key="loading_icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          class="fill-current flex-shrink-0 animate-spin"
        >
          <path d="M2 11H7V13H2zM17 11H22V13H17zM11 17H13V22H11zM11 2H13V7H11z"></path>
          <path transform="rotate(-45.001 6.697 6.697)" d="M5.697 4.197H7.697V9.197H5.697z"></path>
          <path transform="rotate(134.999 17.303 17.303)" d="M16.303 14.803H18.303V19.803H16.303z"></path>
          <path transform="rotate(45.001 6.697 17.303)" d="M5.697 14.803H7.697V19.803H5.697z"></path>
          <path transform="rotate(-44.992 17.303 6.697)" d="M14.803 5.697H19.803V7.697H14.803z"></path>
        </svg>
        <svg v-else key="search_icon" width="16" height="16" viewBox="0 0 24 24" class="fill-current flex-shrink-0">
          <path
            d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z"
          ></path>
        </svg>
      </div>
    </div>

    <!-- menu -->
    <div class="relative flex-1">
      <div
        class="absolute w-full mt-2 transform shadow-md rounded-md scrollbar-sm"
        :class="[
          open && can_search && (!searching || results.length)
            ? 'transition ease-in duration-200 opacity-100 translate-y-0 z-10'
            : 'transition ease-out duration-150 opacity-0 -translate-y-1 pointer-events-none',
        ]"
      >
        <div
          class="w-full h-full overflow-y-auto max-h-64 bg-gray-800 rounded-md shadow-xs border border-white border-opacity-25"
        >
          <!-- no results state -->
          <template v-if="can_search">
            <div
              v-if="!results.length"
              class="h-full flex items-center justify-center text-center px-4 py-6 leading-tight text-sm text-gray-500"
            >
              No result found
            </div>

            <!-- results -->
            <ul v-else class="h-full w-full">
              <li
                v-for="result in results"
                :key="result.uuid"
                class="tw-menu-item tw-menu-item--md text-sm"
                role="option"
                @click="onSelectResult(result)"
              >
                <base-image
                  class="relative block w-8 h-8 rounded-full overflow-hidden object-cover object-center flex-shrink-0 mr-4"
                  :src="result.picture"
                ></base-image>
                <div class="flex-1 overflow-x-hidden">
                  <div class="text-white leading-snug text-ellipsis">{{ result.name }}</div>
                  <div v-if="result.professionalHeadline" class="text-gray-400 leading-snug text-ellipsis text-sm">
                    {{ result.professionalHeadline }}
                  </div>
                </div>
              </li>
            </ul>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
