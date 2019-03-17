import Vue from 'vue';
import VueI18n from 'vue-i18n';

import en from './locale-en';
import ru from './locale-ru';

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'en', // set default locale
  messages: { en, ru, }, // set locale messages
});

export default i18n;
