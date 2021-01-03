<template>
  <v-dialog
    v-model="dialog"
    max-width="1000"
    light
    content-class="elevation-0 ma-0"
  >
    <div class="livro" v-touch="{ left: swipeLeft, right: swipeRight }">
      <v-tooltip bottom nudge-top="10" transition="slide-y-transition">
        <template #activator="{ on, attrs }">
          <div @click="fechar" class="fechar" v-on="on" v-bind="attrs"></div>
        </template>
        <span>Fechar</span>
      </v-tooltip>
      <div class="proximaPagina" v-intersect="onIntersectProximo"></div>
      <div class="anteriorPagina" v-intersect="onIntersectAnterior"></div>
      <slot />
      <div class="pagina">
        <slot name="pagina1" />
      </div>
      <div class="pagina">
        <slot name="pagina2" />
      </div>
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    value: { type: Boolean, default: false }
  },
  data: () => ({
    dialog: false,
    isIntersectingProximo: false,
    isIntersectingAnterior: false
  }),
  watch: {
    value(val) {
      this.dialog = val;
    },
    dialog(val) {
      this.$emit('input', val);
    }
  },
  methods: {
    fechar() {
      this.dialog = false;
    },
    swipeLeft() {
      if (this.isIntersectingProximo) {
        this.$emit('swipe-left');
      }
    },
    swipeRight() {
      if (this.isIntersectingAnterior) {
        this.$emit('swipe-right');
      }
    },
    onIntersectProximo(entries) {
      this.isIntersectingProximo = entries[0].isIntersecting;
    },
    onIntersectAnterior(entries) {
      this.isIntersectingAnterior = entries[0].isIntersecting;
    }
  }
};
</script>
