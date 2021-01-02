import Vue from 'vue';
import Vuex from 'vuex';
import pathify from './pathify';
import createPersistedState from 'vuex-persistedstate';

import configs from './modules/configs';
import almanax from './modules/almanax';

Vue.use(Vuex);

const persistedState = createPersistedState({
  paths: ['configs']
});

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  plugins: [persistedState, pathify.plugin],
  modules: {
    almanax,
    configs
  }
});

export default store;
