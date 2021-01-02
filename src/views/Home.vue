<template>
  <div>
    <v-tabs
      v-model="tab"
      show-arrows
      centered
      color="primary"
      background-color="transparent"
    >
      <v-tab v-for="(month, monthName) in almanax" :key="`tab${monthName}`">
        {{ monthName }}
      </v-tab>
    </v-tabs>

    <v-row no-gutters>
      <v-col>
        <v-tabs-items continuous v-model="tab" class="transparent">
          <v-tab-item v-for="(month, monthName) in almanax" :key="monthName">
            <div class="justify-center d-flex mes-wrapper">
              <Mes :value="month" class="mt-n10" @next="next" @prev="prev" />
            </div>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>

    <DialogDia />
    <DialogMes />
  </div>
</template>

<script>
import { get, sync } from 'vuex-pathify';
import eventBus from '@/event-bus';
import Mes from '@/components/Mes';
import DialogDia from '@/components/DialogDia';
import DialogMes from '@/components/DialogMes';

export default {
  name: 'Home',
  components: { DialogMes, DialogDia, Mes },
  data: () => ({
    tab: 1
  }),
  computed: {
    dias: get('almanax/days'),
    almanax: get('almanax/almanax'),
    diaSelecionado: sync('almanax/diaSelecionado'),
    mesSelecionado: sync('almanax/mesSelecionado'),
    monthsLenght() {
      return Object.keys(this.almanax).length;
    },
    indexDiaAtual() {
      return this.dias.findIndex(
        (dia) =>
          dia.data.day === this.diaSelecionado.data.day &&
          dia.data.month === this.diaSelecionado.data.month
      );
    }
  },
  watch: {
    diaSelecionado(val) {
      this.tab = this.almanax[val.data.month].id - 1;
    }
  },
  mounted() {
    this.tab = new Date().getMonth();

    eventBus.$on('proximo-mes', this.proximoMes);
    eventBus.$on('anterior-mes', this.anteriorMes);

    eventBus.$on('proximo-dia', this.proximoDia);
    eventBus.$on('anterior-dia', this.anteriorDia);
  },
  methods: {
    next() {
      this.tab += 1;
      this.tab = this.tab % this.monthsLenght;
    },
    prev() {
      if (this.tab === 0) {
        this.tab = this.monthsLenght - 1;
      } else {
        this.tab -= 1;
      }
    },
    proximoDia() {
      let indexAtual = this.indexDiaAtual + 1;
      if (indexAtual >= this.dias.length) {
        indexAtual = 0;
      }
      this.openDialogDia(indexAtual);
    },
    anteriorDia() {
      let indexAtual = this.indexDiaAtual - 1;
      if (indexAtual < 0) {
        indexAtual = this.dias.length - 1;
      }
      this.openDialogDia(indexAtual);
    },
    openDialogDia(indexAtual) {
      this.diaSelecionado = this.dias[indexAtual];
      eventBus.$emit('dialog-dia');
    },
    proximoMes() {
      this.next();
      this.openDialogMes();
    },
    anteriorMes() {
      this.prev();
      this.openDialogMes();
    },
    openDialogMes() {
      this.mesSelecionado = Object.values(this.almanax)[this.tab];
      eventBus.$emit('dialog-mes');
    }
  }
};
</script>
