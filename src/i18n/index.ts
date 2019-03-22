import Vue from 'vue';
import VueI18n from 'vue-i18n';

import en from './locale-en';
import ru from './locale-ru';

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'en', // set default locale
  messages: { en, ru }, // set locale messages
});
i18n.locale = 'en';

Object.defineProperty(Vue.prototype, '$locale', {
  get: () => {
    return i18n.locale;
  },
  set: (locale) => {
    i18n.locale = locale;
  },
});

export default i18n;
