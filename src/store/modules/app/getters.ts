import { GetterTree } from 'vuex';
import i18n from '@/i18n';

import {IAppState, ILocaleInfo} from './types';
import { IRootState } from '@/store/types';

export const getters: GetterTree<IAppState, IRootState> = {
  selectedLocale(state): ILocaleInfo {
    const locale = i18n.locale || 'en';
    return state.localeInfos
      .find((x: ILocaleInfo) => x.locale === locale) || state.localeInfos[0];
  },
};
