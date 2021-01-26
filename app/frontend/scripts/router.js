import Vue from 'vue/dist/vue.esm';
import { SiteIndexApp } from 'scripts/apps/site/index.app';
import { TeamsNewApp } from 'scripts/apps/teams/new.app';
import { TeamsShowApp } from 'scripts/apps/teams/show.app';

const routes = {
  site_index: SiteIndexApp,
  teams_new: TeamsNewApp,
  teams_show: TeamsShowApp,
};

export const initializeRoutes = () => {
  if (document.querySelector('[data-route]')) {
    const route = document.querySelector('[data-route]').dataset.route;
    const app = routes?.[route] ? new routes[route]() : new Vue();

    document.addEventListener('turbolinks:before-cache', () => {
      app?.$destroy?.();
    });
  }
};
