import { parseDates } from 'scripts/helpers/dayjs';

export function useBaseApp(options = {}) {
  return {
    el: document.querySelector('#app-root'),

    beforeMount() {
      this.$turbolinksCachedHTML = this.$el.outerHTML;
    },

    destroyed() {
      this.$el.outerHTML = this.$turbolinksCachedHTML;
    },

    mounted() {
      setTimeout(() => {
        this.initializeUILibs();
        options.initialize_libraries?.();
      });
    },

    methods: {
      initializeUILibs() {
        parseDates(this.$el);
      },
    },
  };
}
