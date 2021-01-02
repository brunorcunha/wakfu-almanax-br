<template>
  <Dialog v-model="dialog" @swipe-left="proximo" @swipe-right="anterior">
    <template #pagina1>
      <v-fade-transition leave-absolute>
        <v-card-text v-if="mesSelecionado" :key="mesSelecionado.nome">
          <h1 class="titulo2">{{ mesSelecionado.nome }}</h1>

          <div class="desc">
            - <strong>Protetor: </strong> {{ mesSelecionado.protector.title }}
            <br />
            - <strong>Zodíacos: </strong>
            {{ mesSelecionado.zodiacs[0].title }} e
            {{ mesSelecionado.zodiacs[1].title }}
            <br />
            <template v-if="mesSelecionado.estacoes.length > 1">
              - <strong>Estações:</strong> {{ mesSelecionado.estacoes[0] }},
              {{ mesSelecionado.estacoes[1] }}
            </template>
            <template v-else>
              - <strong>Estação:</strong> {{ mesSelecionado.estacoes[0] }}
            </template>
          </div>

          <div>
            <div class="pl-2 pr-4 pt-1 float-left">
              <img :src="mesSelecionado.protector.img" />
            </div>
            <div class="pt-3">
              <h1 class="titulo1 mb-2">{{ mesSelecionado.protector.title }}</h1>
              <p class="desc">{{ mesSelecionado.protector.desc }}</p>
            </div>
          </div>
        </v-card-text>
      </v-fade-transition>
    </template>

    <template #pagina2>
      <v-fade-transition leave-absolute>
        <v-card-text v-if="mesSelecionado" :key="`${mesSelecionado.nome}2`">
          <div v-if="mesSelecionado.zodiacs[0] && numero === 1">
            <div class="pl-2 pt-1 float-right">
              <img :src="mesSelecionado.zodiacs[0].img" />
            </div>
            <div class="pt-3">
              <h1 class="titulo1 mb-2">
                {{ mesSelecionado.zodiacs[0].title }}
              </h1>
              <p class="desc">
                <strong>De: </strong> {{ mesSelecionado.zodiacs[0].min.dia }} de
                {{ mesSelecionado.zodiacs[0].min.mes.nome }} <br />
                <strong>Até: </strong>
                {{ mesSelecionado.zodiacs[0].max.dia }} de
                {{ mesSelecionado.zodiacs[0].max.mes.nome }}
              </p>
              <p class="desc">{{ mesSelecionado.zodiacs[0].desc }}</p>
            </div>
          </div>

          <div v-if="mesSelecionado.zodiacs[1] && numero === 2">
            <div class="pl-2 pt-1 float-right">
              <img :src="mesSelecionado.zodiacs[1].img" />
            </div>
            <div class="pt-3">
              <h1 class="titulo1 mb-2">
                {{ mesSelecionado.zodiacs[1].title }}
              </h1>
              <p class="desc">
                <strong>De: </strong> {{ mesSelecionado.zodiacs[1].min.dia }} de
                {{ mesSelecionado.zodiacs[1].min.mes.nome }} <br />
                <strong>Até: </strong>
                {{ mesSelecionado.zodiacs[1].max.dia }} de
                {{ mesSelecionado.zodiacs[1].max.mes.nome }}
              </p>
              <p class="desc">{{ mesSelecionado.zodiacs[1].desc }}</p>
            </div>
          </div>
        </v-card-text>
      </v-fade-transition>
    </template>

    <div class="anterior" @click="anterior"></div>
    <div class="proximo" @click="proximo"></div>
  </Dialog>
</template>

<script>
import { get } from 'vuex-pathify';
import eventBus from '@/event-bus';
import Dialog from '@/components/Dialog';

export default {
  name: 'DialogMes',
  components: { Dialog },
  data: () => ({
    dialog: false,
    numero: 1
  }),
  computed: {
    mesSelecionado: get('almanax/mesSelecionado')
  },
  mounted() {
    eventBus.$on('dialog-mes', this.abrir);
  },
  beforeDestroy() {
    eventBus.$off('dialog-mes');
  },
  methods: {
    abrir(numero) {
      this.dialog = true;
      this.numero = numero || 1;
    },
    anterior() {
      eventBus.$emit('anterior-mes');
    },
    proximo() {
      eventBus.$emit('proximo-mes');
    }
  }
};
</script>
