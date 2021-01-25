<script>
import BaseImage from 'scripts/components/base_image';

export default {
  components: {
    'base-image': BaseImage,
  },

  props: {
    team: { type: Object, required: true },
  },

  methods: {
    teamUrl(team) {
      return `/teams/${team.id}`;
    },
  },
};
</script>

<template>
  <div class="bg-gray-800 p-4 md:p-6 rounded-md flex flex-col">
    <div class="flex md:flex-col md:items-center">
      <div v-if="team.cached_images.length" class="flex flex-row-reverse pr-4">
        <div v-for="image in team.cached_images" :key="image" class="-mr-4 last:mr-0">
          <base-image
            :src="image"
            class="w-8 h-8 md:w-12 md:h-12 rounded-full object-cover object-center flex-shrink-0"
          ></base-image>
        </div>
      </div>

      <base-image
        v-else
        class="w-8 h-8 md:w-12 md:h-12 rounded-full object-cover object-center flex-shrink-0"
      ></base-image>

      <div class="ml-4 md:ml-0 md:mt-4 flex-1">
        <div class="leading-tight text-gray-200 md:text-center">
          {{ team.description }}
        </div>
      </div>
    </div>

    <div class="flex-1"></div>

    <a class="tw-btn tw-btn--secondary tw-btn--md mt-4 md:mt-8" :href="teamUrl(team)">View team page</a>
  </div>
</template>
