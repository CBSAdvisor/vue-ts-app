import Vue from 'vue';
import Vuex from 'vuex';
import {AppState} from "@/store/modules";

Vue.use(Vuex);

/* tslint:disable:no-empty-interface */
export interface IRootState {
  version: string;
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({
  state: {
    version: '1.0.0' // a simple property
  },
  // modules: {
  //   app: AppState,
  // }
});
