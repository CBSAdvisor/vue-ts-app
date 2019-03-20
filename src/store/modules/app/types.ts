export const APP_COMMIT = {
  CHANGE_LOCALE: 'CHANGE_LOCALE',
};

export interface ILocaleInfo {
  locale: string;
  lang: string;
  label: string;
}

export interface IAppState {
  localeInfos: ILocaleInfo[];
}
