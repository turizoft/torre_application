import Vue from 'vue/dist/vue.esm';
import Rails from '@rails/ujs';
import Turbolinks from 'turbolinks';
import { initializeRoutes } from 'scripts/router';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

require.context('../images', true);

Rails.start();
Turbolinks.start();

document.addEventListener('turbolinks:load', () => {
  initializeRoutes();
});

Vue.use(VueToast);
