import Vue from 'vue/dist/vue.esm';
import { useBaseApp } from 'scripts/base/base_app.mixin';
import SearchBox from 'scripts/components/search_box';
import TeamList from 'scripts/components/team_list';
import TeamReport from 'scripts/components/team_report';
import HelixLoader from 'scripts/components/helix_loader';
import ShareModal from 'scripts/components/share_modal';
import NProgress from 'nprogress';

export class TeamsShowApp extends Vue {
  constructor() {
    super({
      components: {
        'search-box': SearchBox,
        'team-list': TeamList,
        'team-report': TeamReport,
        'helix-loader': HelixLoader,
        'share-modal': ShareModal,
      },

      data: {
        team: [],
        team_member_ids: gon.team.member_ids,
        team_description: gon.team.description,
        member_endpoint: '/api/bios',
        fetch_count: 0,
        share_modal_open: false,
      },

      mixins: [useBaseApp()],

      mounted() {
        this.team_member_ids.forEach((username) => {
          this.fetchTeamMemberData(username);
        });
      },

      computed: {
        loading() {
          return this.fetch_count < this.team_member_ids.length;
        },

        team_share_description() {
          return `I built my dream team from Torre with: ${this.team_description}. Check it out!`;
        },
      },

      methods: {
        async fetchTeamMemberData(username) {
          try {
            NProgress.start();
            const response = await fetch(`${this.member_endpoint}/${username}`);
            const data = await response.json();
            const { weight, name, professionalHeadline, picture } = data.person;
            this.team.push(
              Object.assign(data, { username, weight, name, professionalHeadline, picture, loaded: true })
            );
          } catch {
            Vue.$toast.open({
              message: `Could not fetch data for ${username}, and won't be included in report`,
              type: 'error',
              position: 'top',
            });
          } finally {
            this.fetch_count += 1;
            NProgress.done();
          }
        },

        async shareTeam() {
          this.share_modal_open = true;
        },
      },
    });
  }
}
