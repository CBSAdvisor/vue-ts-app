import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import {IRootState} from './types';
import {appStateModule} from './modules';

Vue.use(Vuex);

const storeOpt: StoreOptions<IRootState> = {
  state: {
    version: '1.0.0',
  },
  modules: {
    app: appStateModule,
  },
};

export default new Vuex.Store<IRootState>(storeOpt);
