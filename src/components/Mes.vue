<template>
  <div :class="`mes ${estacao}`">
    <div class="cima">
      <div class="protetor" @click="abrirMes(1)">
        <img :src="value.protector.img" />
      </div>
      <div class="zodiaco esquerda" @click="abrirMes(1)">
        <img :src="value.zodiacs[0].img" />
      </div>
      <div class="zodiaco direita" @click="abrirMes(2)">
        <img :src="value.zodiacs[1].img" />
      </div>
      <div class="estacao" @click="abrirMes(1)"></div>
    </div>
    <div class="meio"></div>
    <div class="baixo"></div>
    <div class="conteudo py-4 px-4">
      <Calendar
        :value="value.id"
        :header-date-format="getHeaderFormat"
        :events-format="getEventsFormat"
        @clickDia="abrirDia"
      />
    </div>
    <div class="proximo" @click="$emit('next')"></div>
    <div class="anterior" @click="$emit('prev')"></div>
  </div>
</template>

<script>
import { sync } from 'vuex-pathify';
import eventBus from '@/event-bus';
import Calendar from '@/components/Calendar';

export default {
  name: 'Mes',
  components: { Calendar },
  props: {
    value: { type: Object, default: null }
  },
  computed: {
    diaSelecionado: sync('almanax/diaSelecionado'),
    mesSelecionado: sync('almanax/mesSelecionado'),
    estacao() {
      return this.value.estacoes[0].replace('ã', 'a').toLowerCase();
    }
  },
  methods: {
    getHeaderFormat() {
      const anoAtual = new Date().getFullYear() - 1043;
      return `${this.value.nome} de ${anoAtual}`;
    },
    getEventsFormat(dia) {
      const diaAtual = this.value.days.find((e) => e.data.day === dia);
      if (diaAtual.event) {
        return [diaAtual.meridia.img, diaAtual.event.img];
      }
      return [diaAtual.meridia.img];
    },
    abrirDia(dia) {
      this.mesSelecionado = this.value;
      this.diaSelecionado = this.value.days.find((e) => e.data.day === dia);
      eventBus.$emit('dialog-dia');
    },
    abrirMes(numero) {
      this.mesSelecionado = this.value;
      eventBus.$emit('dialog-mes', numero);
    }
  }
};
</script>
