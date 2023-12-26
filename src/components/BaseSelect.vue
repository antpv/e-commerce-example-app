<template>
  <div class="select w-80 border border-indigo-600">
    <span class="select__title">
      {{ selectTitle }}
    </span>
    <ul class="select__options">
      <li
        v-for="option in options"
        :key="option.key"
        class="select__option"
        @click="handleSelect(option.key)"
      >
        {{ option.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { ActiveFiltersOption } from '../App.vue';

@Options({
  props: {
    options: {
      type: Array,
      required: true
    },
    selectedKeys: {
      type: Array,
      required: true
    }
  },
  emits: [
    'select',
  ],
  computed: {
    selectTitle(): string {
      return this.options
      .filter((option: ActiveFiltersOption) => this.selectedKeys.includes(option.key))
      .map((option: ActiveFiltersOption)  => option.name).join(', ')
      || 'Please, select filter'
    }
  },
  methods: {
    handleSelect(key: string): void {
      this.$emit('select', key)
    }
  }
})
export default class BaseSelect extends Vue {
  options!: Array<ActiveFiltersOption>
  selectedKeys!: Array<string>
  selectTitle!: string
  handleSelect!: ((key: string) => void)
}
</script>

<style lang="scss">
.select {
}
</style>