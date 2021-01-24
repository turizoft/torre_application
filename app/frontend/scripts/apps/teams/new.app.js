import Vue from 'vue/dist/vue.esm';
import { useBaseApp } from 'scripts/base/base_app.mixin';
import SearchBox from 'scripts/components/search_box';
import TeamList from 'scripts/components/team_list';

export class TeamsNewApp extends Vue {
  constructor() {
    super({
      components: {
        'search-box': SearchBox,
        'team-list': TeamList,
      },

      data: {
        team: [],
      },

      mixins: [useBaseApp()],

      methods: {
        addTeamMember(member) {
          if (!this.team.find(({ username }) => username === member.username)) {
            setTimeout(() => {
              this.team.unshift(member);
            }, 0);
          }
        },

        deleteTeamMember(member) {
          this.team = this.team.filter(({ username }) => username !== member.username);
        },
      },
    });
  }
}
