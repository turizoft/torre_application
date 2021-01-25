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
        member_endpoint: '/api/bios',
        max_team_size: 20,
      },

      mixins: [useBaseApp()],

      computed: {
        can_add_more_team_members() {
          return this.team.length < this.max_team_size;
        },
      },

      methods: {
        addTeamMember(member) {
          if (!this.team.find(({ username }) => username === member.username)) {
            setTimeout(async () => {
              this.team.unshift({ ...member, loaded: false });
              this.loading = true;
              await this.fetchTeamMemberData(member);
              this.loading = false;
            }, 0);
          }
        },

        deleteTeamMember(member) {
          this.team = this.team.filter(({ username }) => username !== member.username);
        },

        async fetchTeamMemberData(member) {
          try {
            const data = await fetch(`${this.member_endpoint}/${member.username}`);
          } catch {

          }
        },

        async saveTeam() {
          try {
            NProgress.start();
            const member_ids = this.team.map(({ username }) => username);
            const description = this.team.map(({ name }) => name).join(', ');
            const cached_images = this.team
              .map(({ picture }) => picture)
              .filter(Boolean)
              .slice(0, 3);
            const request_options = {
              method: 'post',
              headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': Rails.csrfToken(),
              },
              body: JSON.stringify({ team: { member_ids, description, cached_images } }),
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
