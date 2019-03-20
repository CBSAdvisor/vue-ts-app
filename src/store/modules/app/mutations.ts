/* Application state mutations */

import { MutationTree } from 'vuex';
import i18n from '@/i18n';
import Cookies from 'js-cookie';
import { IAppState, ILocaleInfo } from './types';

export const mutations: MutationTree<IAppState> = {
  CHANGE_LOCALE(state, locale: string) {
    const localeInfo = state.localeInfos.find((x: ILocaleInfo) => x.locale === locale);

    if (!state.localeInfos) {
      return;
    }

    Cookies.set('locale', locale);
    i18n.locale = locale;
  },
};
