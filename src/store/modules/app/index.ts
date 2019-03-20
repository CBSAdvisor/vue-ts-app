/* Application Store Module  */

import { Module } from 'vuex';
import {IAppState, ILocaleInfo} from './types';
import {IRootState} from '@/store/types';
import {actions} from './actions';
import {mutations} from './mutations';
import {getters} from './getters';

export const state: IAppState = {
  localeInfos: [
    {locale: 'en', lang: 'EN', label: 'English'},
    {locale: 'ru', lang: 'RU', label: 'Russian'},
  ],
};

/* ----- Initialize locale state ----- */
import Cookies from 'js-cookie';
import i18n from '@/i18n';

const locale = Cookies.get('locale') || 'en';
const localeInfo = state.localeInfos
  .find((x: ILocaleInfo) => x.locale === locale) || state.localeInfos[0];

if (localeInfo) {
  Cookies.set('locale', locale);
  i18n.locale = locale;
}
/* ---------- ---------- ---------- ---------- */

const namespaced: boolean = true;

export const appStateModule: Module<IAppState, IRootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

// import {VuexModule, Module, MutationAction, Mutation, Action, getModule} from 'vuex-module-decorators';
// import i18n from '@/i18n';
// import store from '@/store';
// import Cookies from 'js-cookie';
// import {ILocaleInfo, IAppState} from "./types";
//
// @Module({ name: 'app', dynamic: true, store, namespaced: true })
// export class AppStateModule extends VuexModule implements IAppState {
//   public localeInfos: ILocaleInfo[] = [
//     {locale: 'en', lang: 'EN', label: 'English'},
//     {locale: 'ru', lang: 'RU', label: 'Russian'},
//   ];
//   public selectedLocale: ILocaleInfo = this.initLocale();
//
//   @Action({commit: 'CHANGE_LOCALE'}) public changeLocale(locale: string): string {
//     return locale;
//   }
//
//   @Mutation private CHANGE_LOCALE(locale: string): void {
//     const localeInfo = this.localeInfos.find((x: ILocaleInfo) => x.locale === locale);
//
//     if (!localeInfo) {
//       return;
//     }
//
//     this.selectedLocale = localeInfo;
//     Cookies.set('locale', locale);
//     i18n.locale = locale;
//   }
//
//   private initLocale(): ILocaleInfo {
//     const l = Cookies.get('locale') || 'en';
//     this.changeLocale(l);
//
//     return this.localeInfos.find((x: ILocaleInfo) => x.locale === l) || this.localeInfos[0];
//   }
// }
//
// export const AppState = getModule(AppStateModule);
