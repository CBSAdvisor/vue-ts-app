import Vue from 'vue';
import swal, {SweetAlertOptions} from 'sweetalert2';

function isBrowser() {
  return typeof window !== 'undefined';
}

const VueSwAl = () => {
  // Init empty
};

VueSwAl.install = (inVue: any, options: SweetAlertOptions) => {
  // adding a global method or property
  let innerSwal: any;

  if (isBrowser()) {
    innerSwal = (options ? swal.mixin(options) : swal);
  } else {
    innerSwal = () => {
      return Promise.resolve();
    };
  }

  // Modifying the Global Vue Object
  inVue.swal = innerSwal;

  // Modifying Vue Instances
  // To add a property or method directly to component instances
  // without any injection mechanism, you can modify the Vue prototype
  if (!inVue.prototype.hasOwnProperty('$swal')) {
    Object.defineProperty(inVue.prototype, '$swal', {
      get: function get() {
        return innerSwal;
      },
    });
  }
};

Vue.use(VueSwAl);

export default VueSwAl;
