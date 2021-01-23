const { environment } = require('@rails/webpacker');
const { VueLoaderPlugin } = require('vue-loader');
const vue = require('./loaders/vue');
const erb = require('./loaders/erb');

environment.config.merge({
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm',
    },
  },
});
environment.plugins.prepend('VueLoaderPlugin', new VueLoaderPlugin());
environment.loaders.prepend('vue', vue);
environment.loaders.prepend('erb', erb);
module.exports = environment;
