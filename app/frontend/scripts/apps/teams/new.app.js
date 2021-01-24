import Vue from 'vue/dist/vue.esm';
import { useBaseApp } from 'scripts/base/base_app.mixin';
import SearchBox from 'scripts/components/search_box';

export class TeamsNewApp extends Vue {
  constructor() {
    super({
      components: {
        'search-box': SearchBox,
      },

      mixins: [useBaseApp()],
    });
  }
}
