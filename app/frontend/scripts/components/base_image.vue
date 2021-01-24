<script>
import IMAGE_PLACEHOLDER_URL from 'images/placeholders/user_avatar.svg';

export default {
  props: {
    src: { type: String, default: undefined },
    loading_strategy: { type: String, default: 'lazy' },
  },

  data() {
    return {
      IMAGE_PLACEHOLDER_URL,
    };
  },

  methods: {
    imageOnError() {
      return `this.onerror=null;this.src=${IMAGE_PLACEHOLDER_URL};`;
    },
  },
};
</script>

<template>
  <img :src="src || IMAGE_PLACEHOLDER_URL" :onerror="imageOnError()" :loading="loading_strategy" v-on="$listeners" />
</template>
