import Vue from 'vue/dist/vue.esm';
import { useBaseApp } from 'scripts/base/base_app.mixin';
import SearchBox from 'scripts/components/search_box';
import TeamList from 'scripts/components/team_list';
import TeamReport from 'scripts/components/team_report';
import HelixLoader from 'scripts/components/helix_loader';

export class TeamsNewApp extends Vue {
  constructor() {
    super({
      components: {
        'search-box': SearchBox,
        'team-list': TeamList,
        'team-report': TeamReport,
        'helix-loader': HelixLoader,
      },

      data: {
        team: [],
        loading: false,
        search_endpoint: 'https://search.torre.co/people/_search',
        member_endpoint: 'https://torre.bio/api/bios',
      },

      mixins: [useBaseApp()],

      methods: {
        addTeamMember(member) {
          if (!this.team.find(({ username }) => username === member.username)) {
            setTimeout(() => {
              this.team.unshift({ ...member, loaded: false });
              this.loading = true;
              this.fetchTeamMemberData(member);
              this.loading = false;
            }, 0);
          }
        },

        deleteTeamMember(member) {
          this.team = this.team.filter(({ username }) => username !== member.username);
        },

        async fetchTeamMemberData(member) {
          const data = await fetch(`${this.member_endpoint}/${member.username}`);
        },
      },
    });
  }
}
