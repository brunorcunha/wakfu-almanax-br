<template>
  <Dialog v-model="dialog" @swipe-left="proximo" @swipe-right="anterior">
    <template #pagina1>
      <v-fade-transition leave-absolute>
        <v-card-text v-if="diaSelecionado" :key="diaSelecionado.data.day">
          <h1 class="titulo2">
            {{ diaSelecionado.data.day.pad() }} de
            {{ diaSelecionado.data.month }} de
            {{ ano }}
          </h1>

          <div :class="`estacaobg ${estacao} float-right ma-3`">
            <div class="estacao"></div>
          </div>

          <div class="desc">
            - <strong>Protetor: </strong> {{ mesSelecionado.protector.title }}
            <br />
            - <strong>Zodíaco: </strong> {{ diaSelecionado.zodiac.title }}
            <br />
            - <strong>Merídia: </strong> {{ diaSelecionado.meridia.title }}
            <br />
            - <strong>Estação: </strong> {{ diaSelecionado.estacao }}
          </div>

          <div>
            <div class="pl-2 pr-4 pt-1 float-left">
              <img :src="diaSelecionado.meridia.img" />
            </div>
            <div class="pt-3">
              <h1 class="titulo1 mb-2">{{ diaSelecionado.meridia.title }}</h1>
              <p class="desc">{{ diaSelecionado.meridia.desc }}</p>
            </div>
          </div>
        </v-card-text>
      </v-fade-transition>
    </template>

    <template #pagina2>
      <v-fade-transition leave-absolute>
        <v-card-text
          v-if="diaSelecionado"
          :key="`${diaSelecionado.data.day}-2`"
        >
          <div v-if="diaSelecionado.event">
            <div class="pl-4 float-right foto">
              <img :src="diaSelecionado.event.img" width="120" />
            </div>
            <div class="pt-3">
              <h1 class="titulo1 mb-2">{{ diaSelecionado.event.title }}</h1>
              <p class="desc">{{ diaSelecionado.event.desc }}</p>
            </div>
          </div>

          <div v-if="diaSelecionado.trivia">
            <div class="pt-3">
              <h1 class="titulo1 mb-2">Curiosidade</h1>
              <p class="desc">{{ diaSelecionado.trivia }}</p>
            </div>
          </div>
        </v-card-text>
      </v-fade-transition>
    </template>

    <v-tooltip bottom nudge-top="10" transition="slide-y-transition">
      <template #activator="{ on, attrs }">
        <div class="anterior" @click="anterior" v-on="on" v-bind="attrs"></div>
      </template>
      <span>Página Anterior</span>
    </v-tooltip>
    <v-tooltip bottom nudge-top="10" transition="slide-y-transition">
      <template #activator="{ on, attrs }">
        <div class="proximo" @click="proximo" v-on="on" v-bind="attrs"></div>
      </template>
      <span>Próxima Página</span>
    </v-tooltip>
  </Dialog>
</template>

<script>
import { get } from 'vuex-pathify';
import eventBus from '@/event-bus';
import Dialog from '@/components/Dialog';

export default {
  name: 'DialogDia',
  components: { Dialog },
  data: () => ({
    dialog: false
  }),
  computed: {
    diaSelecionado: get('almanax/diaSelecionado'),
    mesSelecionado: get('almanax/mesSelecionado'),
    estacao() {
      return this.diaSelecionado.estacao.replace('ã', 'a').toLowerCase();
    },
    ano() {
      return new Date().getFullYear() - 1043;
    }
  },
  mounted() {
    eventBus.$on('dialog-dia', this.abrir);
  },
  beforeDestroy() {
    eventBus.$off('dialog-dia');
  },
  methods: {
    abrir() {
      this.dialog = true;
    },
    anterior() {
      eventBus.$emit('anterior-dia');
    },
    proximo() {
      eventBus.$emit('proximo-dia');
    }
  }
};
</script>
