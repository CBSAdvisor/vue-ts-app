import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

/* tslint:disable:no-empty-interface */
export interface IRootState {
  version: string;
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({});
