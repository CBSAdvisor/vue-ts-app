import Vue from 'vue';
import swal, {SweetAlertOptions} from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

function isBrowser() {
  return typeof window !== 'undefined';
}

const VueSwAl = function () {};

VueSwAl.install = function (_Vue: any, options: SweetAlertOptions) {
  // adding a global method or property
  let _swal: any;

  if (isBrowser()) {
    _swal = (options ? swal.mixin(options) : swal);
  } else {
    _swal = function () {
      return Promise.resolve();
    };
  }

  // Modifying the Global Vue Object
  _Vue.swal = _swal;

  // Modifying Vue Instances
  // To add a property or method directly to component instances
  // without any injection mechanism, you can modify the Vue prototype
  if (!_Vue.prototype.hasOwnProperty('$swal')) {
    Object.defineProperty(_Vue.prototype, '$swal', {
      get: function get() {
        return _swal
      }
    });
  }
};

Vue.use(VueSwAl);

export default VueSwAl;
