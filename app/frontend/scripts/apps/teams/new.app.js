import Vue from 'vue/dist/vue.esm';
import Rails from '@rails/ujs';
import Turbolinks from 'turbolinks';
import { useBaseApp } from 'scripts/base/base_app.mixin';
import SearchBox from 'scripts/components/search_box';
import TeamList from 'scripts/components/team_list';
import TeamReport from 'scripts/components/team_report';
import HelixLoader from 'scripts/components/helix_loader';
import NProgress from 'nprogress';

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
        member_endpoint: 'https://bio.torre.co/api/bios',
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

        async saveTeam() {
          try {
            NProgress.start();
            const member_ids = this.team.map(({ username }) => username);
            const member_names = this.team.map(({ name }) => name).join(', ');
            const description = `Check my dream team on Torre.co: ${member_names}`;
            const request_options = {
              method: 'post',
              headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': Rails.csrfToken(),
              },
              body: JSON.stringify({ team: { member_ids, description } }),
            };
            const response = await fetch('/api/teams', request_options);
            const data = await response.json();
            Turbolinks.visit(`/teams/${data.id}`);
          } catch {
            Vue.$toast.open({ message: 'Team could not be saved', type: 'error', position: 'top' });
          } finally {
            NProgress.done();
          }
        },
      },
    });
  }
}
