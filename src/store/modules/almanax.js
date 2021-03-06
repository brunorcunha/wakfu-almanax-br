import { make } from 'vuex-pathify';
import json from '@/json/almanax';

const state = {
  ...json,
  almanax: null,
  mesSelecionado: null,
  diaSelecionado: null
};

const getters = make.getters(state);
const mutations = make.mutations(state);

const actions = {
  ...make.actions(state),
  async init({ commit, state }) {
    const { days, months, zodiacs } = state;

    const almanax = days.reduce((ac, item) => {
      const month = item.data.month;

      if (!ac[month]) {
        ac[month] = {
          ...months[month],
          zodiacs: months[month].zodiacs.map((zodiac) => zodiacs[zodiac]),
          days: []
        };
      }

      item.zodiac = zodiacs[item.zodiac];
      ac[month].days.push(item);

      return ac;
    }, {});

    commit('SET_ALMANAX', almanax);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
