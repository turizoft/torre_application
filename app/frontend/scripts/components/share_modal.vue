<script>
import { vueEditableProp } from 'scripts/helpers/helpers';
import LinkedInButton from 'vue-share-buttons/src/components/LinkedInButton';
import TwitterButton from 'vue-share-buttons/src/components/TwitterButton';
import FacebookButton from 'vue-share-buttons/src/components/FacebookButton';

export default {
  components: {
    'twitter-button': TwitterButton,
    'facebook-button': FacebookButton,
    'linkedin-button': LinkedInButton,
  },

  props: {
    share_description: { type: String, required: true },
    open: Boolean,
  },

  computed: {
    $$open: vueEditableProp('open'),

    share_url() {
      return location.href;
    },
  },

  methods: {
    hideModal() {
      this.$$open = false;
    },
  },
};
</script>

<template>
  <div class="tw-modal-dimmer" :class="{ 'tw-modal-dimmer--open': open }" @click.self="hideModal">
    <div class="tw-modal-content" :class="open ? 'tw-modal-content--open' : 'tw-modal-content--closed'">
      <div
        class="transition-colors duration-150 cursor-pointer absolute right-0 top-0 transform -translate-x-2 translate-y-2 text-gray-500 hover:text-gray-700"
        @click="hideModal"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" class="flex-shrink-0 fill-current">
          <path
            d="M16.192 6.344L11.949 10.586 7.707 6.344 6.293 7.758 10.535 12 6.293 16.242 7.707 17.656 11.949 13.414 16.192 17.656 17.606 16.242 13.364 12 17.606 7.758z"
          ></path>
        </svg>
      </div>

      <!-- content -->
      <h3 class="text-white text-lg md:text-xl leading-tight pb-2 border-b border-gray-600 mb-4">Share this team!</h3>

      <div class="flex flex-wrap -mb-2">
        <twitter-button
          :share-url="share_url"
          :description="share_description"
          class="share-button--circle mr-2 mb-2"
        ></twitter-button>

        <facebook-button
          :url="share_url"
          :description="share_description"
          class="share-button--circle mr-2 mb-2"
        ></facebook-button>

        <linkedin-button
          :url="share_url"
          :description="share_description"
          class="share-button--circle mr-2 mb-2"
        ></linkedin-button>
      </div>
    </div>
  </div>
</template>
