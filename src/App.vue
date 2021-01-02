<template>
  <v-app>
    <v-overlay :value="true" v-if="!almanax">
      <v-progress-circular indeterminate size="64" />
    </v-overlay>
    <template v-else>
      <div
        class="text-center py-10 py-lg-16 logobg mb-n6 d-inline-block text-no-wrap"
      >
        <img src="./assets/nax.png" v-if="$vuetify.breakpoint.lgAndUp" />
        <img src="./assets/almanax3.png" class="px-6 logo" />
        <img src="./assets/nax.png" v-if="$vuetify.breakpoint.lgAndUp" />
      </div>

      <v-main>
        <router-view :key="$route.fullPath" />
      </v-main>
    </template>
  </v-app>
</template>

<script>
import { get, dispatch } from 'vuex-pathify';

export default {
  name: 'App',
  computed: {
    almanax: get('almanax/almanax')
  },
  created() {
    dispatch('almanax/init');
  }
};
</script>

<style>
@import './App.css';
</style>
