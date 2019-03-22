import Vue from 'vue';
import VeeValidate from 'vee-validate';
import i18n from '@/i18n';

// @ts-ignore
import en from 'vee-validate/dist/locale/en.js';
// @ts-ignore
import ru from 'vee-validate/dist/locale/ru.js';

Vue.use(VeeValidate, {
  i18nRootKey: 'validations',
  i18n,
  dictionary: { en, ru },
  // This is the default
  inject: true,
  // Important to name this something other than 'fields'
  fieldsBagName: '$veeFields',
});

export default VeeValidate;
