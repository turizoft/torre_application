import Vue from 'vue/dist/vue.esm';
import { useBaseApp } from 'scripts/base/base_app.mixin';

export class SiteIndexApp extends Vue {
  constructor() {
    super({
      mixins: [useBaseApp()],
    });
  }
}
