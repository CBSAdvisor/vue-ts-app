<template>
  <div class="app">

    <!-- App Header -->
    <div class="app-header">
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="/dashboard">BRAND</b-navbar-brand>

        <b-navbar-toggle target="nav_collapse"/>

        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <b-nav-item href="/users">Users</b-nav-item>
          </b-navbar-nav>
        </b-collapse>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-dropdown text="Lang" class="m-md-2" right>
            <b-dropdown-item active>EN</b-dropdown-item>
            <b-dropdown-item>ES</b-dropdown-item>
            <b-dropdown-item @click="changeLang('ru')">RU</b-dropdown-item>
            <b-dropdown-item>FA</b-dropdown-item>
          </b-dropdown>
        </b-navbar-nav>
      </b-navbar>
    </div>
    <!-- / App Header -->

    <!-- App body -->
    <div class="app-body">
      <!-- MAIN -->
      <main class="main">
        <div class="container-fluid">
            <router-view/>
        </div>
      </main>
      <!-- / MAIN -->
    </div>
    <!-- / App body -->

  </div>
</template>

<script lang="ts">
import ResizeMixin from './mixin/ResizeHandler';
import {Component} from 'vue-property-decorator';
import { mixins } from 'vue-class-component';

@Component({ name: 'layout' })
export default class Layout extends mixins(ResizeMixin) {
  private changeLang(lang: string) {
    this.$i18n.locale = lang;
  }
}
</script>

<style lang="scss" scoped>
</style>
