import {PluginFunction, VueConstructor} from 'vue';
import swal from 'sweetalert2';
import { ErrorBag, FieldFlagsBag, Validator, VeeValidateComponentOptions } from 'vee-validate';

declare module 'vue/types/vue' {
  interface Vue {
    $swal: typeof swal;
    $veeFields: FieldFlagsBag;
  }
  interface VueConstructor<V extends Vue = Vue> {
    swal: typeof swal;
  }
}

declare const VueSwAl: PluginFunction<any>;
export default VueSwAl;
