<script>
import BaseImage from 'scripts/components/base_image';

export default {
  components: {
    'base-image': BaseImage,
  },

  props: {
    team: { type: Array, required: true },
  },
};
</script>

<template>
  <div class="">
    <div v-for="member in team" :key="member.username" class="tw-menu-item tw-menu-item--md">
      <base-image
        class="relative block w-12 h-12 rounded-full overflow-hidden object-cover object-center flex-shrink-0 mr-4"
        :src="member.picture"
      ></base-image>
      <div class="flex-1 overflow-x-hidden">
        <div class="text-white leading-snug">{{ member.name }}</div>
        <div v-if="member.professionalHeadline" class="text-gray-400 leading-snug text-sm">
          {{ member.professionalHeadline }}
        </div>
      </div>
    </div>
  </div>
</template>
