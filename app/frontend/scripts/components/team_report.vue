<script>
import BaseImage from 'scripts/components/base_image';

export default {
  components: {
    'base-image': BaseImage,
  },

  props: {
    team: { type: Array, required: true },
  },

  computed: {
    team_skills() {
      return Object.values(
        this.team
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
  },

  methods: {
    frequencyBackground(frequency) {
      return `bg-gray-${(4 + (this.max_skill_frequency - Math.min(frequency, 4))) * 100}`;
    },

    frequencyTextColor(frequency) {
      return `text-gray-${(1 + (this.max_skill_frequency - Math.min(frequency, 4))) * 100}`;
    },
  },
};
</script>

<template>
  <div class="">
    <div class="text-gray-100 text-lg leading-tight mb-4">Team skills coverage</div>

    <div class="flex flex-wrap items-center -mb-1">
      <div
        v-for="skill in team_skills"
        :key="skill.name"
        class="tw-tag-label flex items-center rounded-full mb-1 mr-1"
        :class="[frequencyBackground(skill.frequency), frequencyTextColor(skill.frequency)]"
      >
        {{ skill.name }}
      </div>
    </div>
  </div>
</template>
