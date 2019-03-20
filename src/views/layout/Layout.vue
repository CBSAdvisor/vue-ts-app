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
          <b-dropdown :text="language.lang" class="m-md-2" right>
            <b-dropdown-item-button v-for="l in supportedLangs"
                                    :active="l.locale === language.locale"
                                    @click="changeLang(l.locale)">
              <div class="d-flex align-items-center">
                <img :src="'img/flags/'+l.locale+'.png'"/>
                <span style="padding-left: 8px;">{{l.label}}</span>
              </div>
            </b-dropdown-item-button>
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
import { State, Action, Getter } from 'vuex-class';
import { mixins } from 'vue-class-component';

import {ILocaleInfo, IAppState} from '@/store/modules/types';

@Component({ name: 'layout' })
export default class Layout extends mixins(ResizeMixin) {
  @State('app') private app!: IAppState;
  @Getter('selectedLocale', { namespace: 'app' }) private selectedLocale!: ILocaleInfo;
  @Action('changeLocale', {namespace: 'app'}) private changeLocale: any;

  public get supportedLangs(): ILocaleInfo[] {
    return this.app.localeInfos;
  }

  get language(): ILocaleInfo {
    if (!this.selectedLocale) {
      this.changeLocale('en');
    }
    return this.selectedLocale;
  }

  private changeLang(locale: string) {
    this.changeLocale(locale).then((x: ILocaleInfo)=> { });
    // Another way to change locale is call "$store.dispatch"
    // this.$store.dispatch('app/changeLocale', locale)
    //   .then((x) => {});
  }
}
</script>

<style lang="scss" scoped>
</style>
