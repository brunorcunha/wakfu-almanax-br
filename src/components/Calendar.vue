<template>
  <div class="text-center black--text">
    <h1 class="pt-3 pb-2">{{ header }}</h1>
    <table class="calendar">
      <thead>
        <tr>
          <th
            class="text-capitalize"
            v-for="weekday in arrayWeekNames"
            :key="weekday"
          >
            {{ weekday }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(tr, i) in matrixDays" :key="`tr${i}`">
          <td v-for="(td, j) in tr" :key="`td${j}`">
            <v-btn
              v-if="!!td"
              text
              light
              @click="$emit('clickDia', td)"
              class="evento"
            >
              {{ td }}
              <div>
                <img
                  v-for="(evento, index) in eventsFormat(td)"
                  :src="evento"
                  :key="`${td}-${index}`"
                  width="10"
                />
              </div>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { DateTime } from 'luxon';

export default {
  name: 'Calendar',
  props: {
    value: { type: Number, default: null },
    firstDayOfWeek: { type: [String, Number], default: 7 },
    headerDateFormat: { type: Function, default: () => this.getHeaderFormat() },
    eventsFormat: { type: Function, default: () => this.getEventsFormat() }
  },
  data: () => ({
    data: null
  }),
  computed: {
    firstDayOfTheMonth() {
      return this.data.startOf('month');
    },
    lastDayOfTheMonth() {
      return this.data.endOf('month');
    },
    daysInMonth() {
      return Math.ceil(
        this.lastDayOfTheMonth.diff(this.firstDayOfTheMonth, 'days').days
      );
    },
    weekDaysBeforeFirstDayOfTheMonth() {
      const weekDay = this.firstDayOfTheMonth.weekday;
      return (weekDay - parseInt(this.firstDayOfWeek) + 7) % 7;
    },
    header() {
      return this.headerDateFormat();
    },
    arrayWeekNames() {
      let baseDate = DateTime.fromISO('2020-03-01');
      const week = Array(7);
      for (let day = 0; day < 7; day++) {
        week[day] = baseDate.toFormat('EEE').replace('.', '');
        baseDate = baseDate.plus({ day: 1 });
      }
      return week;
    },
    matrixDays() {
      const rows = [];

      let children = [];
      for (let day = 1; day <= this.weekDaysBeforeFirstDayOfTheMonth; day++) {
        children.push('');
      }

      for (let day = 1; day <= this.daysInMonth; day++) {
        children.push(day);

        if (!(children.length % 7)) {
          rows.push(children);
          children = [];
        }
      }
      rows.push(children);
      return rows;
    }
  },
  created() {
    this.data = DateTime.local().set({ month: this.value });
  },
  methods: {
    getHeaderFormat() {
      return this.data.toFormat('MMMM yyyy');
    },
    getEventsFormat() {
      return null;
    }
  }
};
</script>
