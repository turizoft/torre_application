<script>
import BaseImage from 'scripts/components/base_image';

export default {
  components: {
    'base-image': BaseImage,
  },

  props: {
    team: { type: Array, required: true },
    on_delete_team_member: { type: Function, default: undefined },
    editable: Boolean,
    disabled: Boolean,
  },

  methods: {
    deleteTeamMember(member) {
      this.on_delete_team_member?.(member);
    },
  },
};
</script>

<template>
  <transition-group tag="div" name="v-left-animable-list">
    <div v-for="member in team" :key="member.username" class="flex items-center py-2 v-left-animable-list-item">
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
      <button
        v-if="editable"
        type="button"
        class="tw-btn tw-btn--gray rounded-full p-2 ml-4 flex-shrink-0"
        :disabled="disabled"
        @click="deleteTeamMember(member)"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" class="fill-current">
          <path
            fill="none"
            d="M17.004 20L17.003 8h-1-8-1v12H17.004zM13.003 10h2v8h-2V10zM9.003 10h2v8h-2V10zM9.003 4H15.003V6H9.003z"
          ></path>
          <path
            d="M5.003,20c0,1.103,0.897,2,2,2h10c1.103,0,2-0.897,2-2V8h2V6h-3h-1V4c0-1.103-0.897-2-2-2h-6c-1.103,0-2,0.897-2,2v2h-1h-3 v2h2V20z M9.003,4h6v2h-6V4z M8.003,8h8h1l0.001,12H7.003V8H8.003z"
          ></path>
          <path d="M9.003 10H11.003V18H9.003zM13.003 10H15.003V18H13.003z"></path>
        </svg>
      </button>
    </div>
  </transition-group>
</template>
