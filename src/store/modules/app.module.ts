import {VuexModule, Module, MutationAction, Mutation, Action, getModule} from 'vuex-module-decorators';
import i18n from '@/i18n';
import store from '@/store';
import Cookies from 'js-cookie';

export interface ILocaleInfo {
  locale: string;
  lang: string;
  label: string;
}

/* tslint:disable:no-empty-interface */
export interface IAppState {
  localeInfos: ILocaleInfo[];
}

@Module({ dynamic: true, store, name: 'app' })
class AppStateModule extends VuexModule implements IAppState {
  public localeInfos: ILocaleInfo[] = [
    {locale: 'en', lang: 'EN', label: 'English'},
    {locale: 'ru', lang: 'RU', label: 'Russian'},
  ];
  public selectedLocale: ILocaleInfo = this.initLocale();

  @Action({commit: 'CHANGE_LOCALE'}) public changeLocale(locale: string): string {
    return locale;
  }

  @Mutation private CHANGE_LOCALE(locale: string): void {
    const localeInfo = this.localeInfos.find((x: ILocaleInfo) => x.locale === locale);

    if (!localeInfo) {
      return;
    }

    this.selectedLocale = localeInfo;
    Cookies.set('locale', locale);
    i18n.locale = locale;
  }

  private initLocale(): ILocaleInfo {
    const l = Cookies.get('locale') || 'en';
    this.changeLocale(l);

    return this.localeInfos.find((x: ILocaleInfo) => x.locale === l) || this.localeInfos[0];
  }
}


export const AppState = getModule(AppStateModule);
