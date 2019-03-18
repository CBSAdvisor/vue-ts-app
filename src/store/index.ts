import Vue from 'vue';
import Vuex from 'vuex';
import {IUsersState, IAppState} from './modules';

Vue.use(Vuex);

/* tslint:disable:no-empty-interface */
export interface IRootState {
  string: '1.0.0';
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({});
