<script>
export default {
  props: {
    team: { type: Array, required: true },
  },

  computed: {
    team_skills() {
      return Object.values(
        this.team
          .filter(({ loaded }) => loaded)
          .map(({ skills }) => skills)
          .flat()
          .reduce((m, e) => {
            m[e.name] = m[e.name] ? { ...e, frequency: m[e.name].frequency + 1 } : { ...e, frequency: 1 };
            return m;
          }, {})
      );
    },

    max_skill_frequency() {
      return Math.min(4, Math.max(1, ...this.team_skills.map(({ frequency }) => frequency)));
    },

    team_interests() {
      return Object.values(
        this.team
          .filter(({ loaded }) => loaded)
          .map(({ interests }) => interests)
          .flat()
          .reduce((m, e) => {
            m[e.name] = m[e.name] ? { ...e, frequency: m[e.name].frequency + 1 } : { ...e, frequency: 1 };
            return m;
          }, {})
      );
    },

    max_interest_frequency() {
      return Math.min(4, Math.max(1, ...this.team_interests.map(({ frequency }) => frequency)));
    },

    team_languages() {
      return Object.values(
        this.team
          .filter(({ loaded }) => loaded)
          .map(({ languages }) => languages)
          .flat()
          .reduce((m, e) => {
            if (!m[e.code]) {
              m[e.code] = e;
            }
            return m;
          }, {})
      );
    },

    most_used_language() {
      return Object.values(
        this.team
          .filter(({ loaded }) => loaded)
          .map(({ languages }) => languages)
          .flat()
          .reduce((m, e) => {
            m[e.code] = m[e.code] ? { ...e, frequency: m[e.code].frequency + 1 } : { ...e, frequency: 1 };
            return m;
          }, {})
      ).sort((a, b) => b.frequency - a.frequency)[0];
    },

    team_weight() {
      return parseInt(this.team.filter(({ loaded }) => loaded).reduce((m, { weight }) => m + weight, 0));
    },
  },

  methods: {
    frequencyBackground(frequency, max_frequency) {
      return `bg-gray-${(4 + (max_frequency - Math.min(frequency, 4))) * 100}`;
    },

    frequencyTextColor(frequency, max_frequency) {
      return `text-gray-${(1 + (max_frequency - Math.min(frequency, 4))) * 100}`;
    },
  },
};
</script>

<template>
  <div>
    <!-- weight -->
    <div class="text-gray-100 text-lg leading-tight mb-4">Team strength</div>

    <div class="mb-6">
      <div class="text-gray-200 leading-tight flex items-center">
        <svg width="20" height="20" viewBox="0 0 24 24" class="fill-current mr-1">
          <path
            d="M6 5L6 11 6 13 6 19 9 19 9 13 15 13 15 19 18 19 18 5 15 5 15 11 9 11 9 5zM3 15c0 .553.447 1 1 1h1V8H4C3.447 8 3 8.447 3 9v2H2v2h1V15zM21 9c0-.553-.447-1-1-1h-1v8h1c.553 0 1-.447 1-1v-2h1v-2h-1V9z"
          ></path>
        </svg>
        {{ team_weight }} total weight
      </div>
    </div>

    <!-- interests -->
    <div class="text-gray-100 text-lg leading-tight mb-4">Team interests</div>

    <div class="mb-6">
      <div v-if="team_interests.length" class="flex flex-wrap items-center -mb-1">
        <div
          v-for="interest in team_interests"
          :key="interest.name"
          class="tw-tag-label flex items-center rounded-full mb-1 mr-1"
          :class="[
            frequencyBackground(interest.frequency, max_interest_frequency),
            frequencyTextColor(interest.frequency, max_interest_frequency),
          ]"
        >
          {{ interest.name }}
        </div>
      </div>

      <div v-else class="text-gray-500 leading-tight text-sm">
        None of your team members have added interests to their profiles yet.
      </div>
    </div>

    <!-- skills -->
    <div class="text-gray-100 text-lg leading-tight mb-4">Team skills coverage</div>

    <div class="mb-6">
      <div v-if="team_skills.length" class="flex flex-wrap items-center -mb-1">
        <div
          v-for="skill in team_skills"
          :key="skill.name"
          class="tw-tag-label flex items-center rounded-full mb-1 mr-1"
          :class="[
            frequencyBackground(skill.frequency, max_skill_frequency),
            frequencyTextColor(skill.frequency, max_skill_frequency),
          ]"
        >
          {{ skill.name }}
        </div>
      </div>

      <div v-else class="text-gray-500 leading-tight text-sm">
        None of your team members have added skills to their profiles yet.
      </div>
    </div>

    <!-- communication -->
    <div class="text-gray-100 text-lg leading-tight mb-4">Communication</div>

    <div class="mb-6">
      <template v-if="team_languages.length">
        <div class="mb-4">
          <div class="text-gray-300 leading-tight mb-2">Languages spoken</div>

          <div class="flex flex-wrap items-center -mb-1 mt-1">
            <div
              v-for="language in team_languages"
              :key="language.language"
              class="tw-tag-label flex items-center rounded-full mb-1 mr-1"
            >
              {{ language.language }}
            </div>
          </div>
        </div>

        <div class="mb-4">
          <div class="text-gray-300 leading-tight mb-2">Most used language</div>
          <div class="text-gray-200 leading-tight">
            {{ parseInt((most_used_language.frequency * 100) / team.length) }}% of your team members speak
            {{ most_used_language.language }}
          </div>
        </div>
      </template>

      <div v-else class="text-gray-500 leading-tight text-sm">
        None of your team members have added languages to their profiles yet.
      </div>
    </div>
  </div>
</template>
