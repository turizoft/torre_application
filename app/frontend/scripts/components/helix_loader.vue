<script>
export default {
  props: {
    size: { type: Number, default: 7 },
    timer: { type: Number, default: 0.6 },
  },

  computed: {
    wrapper_style() {
      return `--t: ${this.timer}s; --n: ${this.size}; --tb: ${this.timer / this.size}s`;
    },
  },

  methods: {
    ballStyle(index) {
      return `--index: ${index}`;
    },
  },
};
</script>

<template>
  <div class="helix-wrapper" :style="wrapper_style">
    <div>
      <div class="helix top">
        <div v-for="index in size" :key="index" class="helix-ball" :style="ballStyle(index)"></div>
      </div>
      <div class="helix bottom">
        <div v-for="index in size" :key="index" class="helix-ball" :style="ballStyle(index)"></div>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.helix-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1rem;
}

.helix {
  width: calc(1.5rem * var(--n));
  display: flex;
  justify-content: space-between;

  &.top {
    transform: translateY(50%);
    .helix-ball {
      animation-delay: calc(var(--tb) * var(--index) - var(--t) * 2);
      &:after {
        background: #cddc39;
        animation-delay: calc(var(--tb) * var(--index) - var(--t) * 2);
      }
    }
  }

  &.bottom {
    transform: translateY(-50%);
    .helix-ball {
      animation-delay: calc(var(--tb) * var(--index) - var(--t));
      &:after {
        background: lighten(#cddc39, 25%);
        animation-delay: calc(var(--tb) * var(--index) - var(--t));
      }
    }
  }

  .helix-ball {
    width: 1rem;
    height: 1rem;
    animation: var(--t) helix-movement ease-in-out infinite alternate;

    &:after {
      content: '';
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      display: block;
      animation: calc(var(--t) * 2) helix-scaling ease-in-out infinite;
      opacity: 0.5;
    }
  }
}
</style>
