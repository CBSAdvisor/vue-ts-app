import Vue, { PluginObject, PluginFunction, VueConstructor } from 'vue';
import swal, { SweetAlertOptions, SweetAlertType } from 'sweetalert2';

declare module 'vue/types/vue' {
  interface Vue {
    $swal: typeof swal;
  }
  interface VueConstructor<V extends Vue = Vue> {
    swal: typeof swal;
  }
}

//

declare const VueSwAl: PluginFunction<any>;

export default VueSwAl;
