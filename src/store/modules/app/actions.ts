/* Application state actions */

import { ActionTree } from 'vuex';

import {IAppState, APP_COMMIT, ILocaleInfo} from './types';
import { IRootState } from '@/store/types';

export const actions: ActionTree<IAppState, IRootState> = {
  changeLocale({ commit }, locale: string): Promise<ILocaleInfo> {
    commit(APP_COMMIT.CHANGE_LOCALE, locale);
    return Promise.resolve(this.getters['app/selectedLocale']);
  },
};
