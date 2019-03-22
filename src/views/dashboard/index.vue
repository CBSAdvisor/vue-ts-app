<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col col sm="12">
        <h1 class="mt-4">DASHBOARD</h1>
      </b-col>
    </b-row>
    <b-row>
      <b-button class="primary" @click="showAlert">SWAL</b-button>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Dashboard extends Vue {
  private showAlert(): void {
  this.$swal.fire(
      'Good job!',
      'You clicked the button!',
      'success'
    );
  }
}
</script>

<style lang="scss" scoped>
</style>
