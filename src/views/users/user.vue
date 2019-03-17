<template>
  <div class="modal" :class="{ 'active': visible }">USER EDITOR</div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {IUser} from '@/api/models';

  @Component({name: 'user-editor'})
  export default class UserEditor extends Vue {
    private visible = false;
    private user: any;

    public show(usr: IUser) {
    }

    public mounted() {
      this.$root.$on('user::editor::show', (e: any, item: any) => {
        this.visible = true;
      });
    }
  }
</script>

<style scoped lang="scss">
</style>
