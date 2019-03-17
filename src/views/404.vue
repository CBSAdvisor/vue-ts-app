<template>
  <div class="http404-container">
    <div class="text-404-headline">{{ message }}</div>
    <a href="/" class="text-404-return-home">Dashboard</a>
  </div>
</template>

<script lang='ts'>
  import {Component, Vue} from 'vue-property-decorator';

  @Component
  export default class NotFound extends Vue {
    get message() {
      return '404';
    }
  }
</script>

<style lang="scss" scoped>
  .http404-container {
    transform: translate(-50%, -50%);
    position: absolute;
    top: 40%;
    left: 50%;
  }
</style>
