import Vue from 'vue/dist/vue.esm';
import { useBaseApp } from 'scripts/base/base_app.mixin';
import TeamCard from 'scripts/components/team_card';

export class SiteIndexApp extends Vue {
  constructor() {
    super({
      mixins: [useBaseApp()],

      components: {
        'team-card': TeamCard,
      },

      data: {
        recent_teams: gon.recent_teams,
      },
    });
  }
}
