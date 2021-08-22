<template>
  <div class="label-tag" :class="{ 'label-tag--active': active }" v-if="text || $slots.default">
    <slot default>{{ text }}</slot>
  </div>
</template>

<script>
export default {
  name: 'Label Tag',

  props: {
    text: {
      type: String,
    },
    active: {
      type: Boolean,
      default: () => false,
    },
  },
}
</script>
<style scoped lang="scss">
.label-tag {
  --v-chip-size: 0.875rem;
  --v-chip-height: 32px;
  font-size: 0.875rem;
  padding: 0 12px;
  align-items: center;
  cursor: default;
  display: inline-flex;
  position: relative;
  text-decoration: none;
  border-color: rgba(var(--v-border-color), var(--v-border-opacity));
  border-style: solid;
  border-radius: 8px;
  border-width: 1px;
  box-shadow: 0px 0px 0px 0px rgb(0 0 0 / 20%), 0px 0px 0px 0px rgb(0 0 0 / 14%), 0px 0px 0px 0px rgb(0 0 0 / 12%);
  height: calc(var(--v-chip-height) + 0px);
  color: rgba(var(--v-border-color), 0.5);
}
.label-tag--active {
  background: #00e676;
  color: #fff;
  border-color: transparent;
}
</style>
