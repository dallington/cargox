<template>
  <v-list-item two-line :class="{ 'pa-0': padding === false }">
    <v-list-item-avatar rounded horizontal v-if="icon || $slots.icon" class="align-self-start">
      <v-icon class="text-blue-grey-lighten-1" v-if="!$slots.icon">
        {{ icon }}
      </v-icon>
      <slot name="icon"></slot>
    </v-list-item-avatar>

    <div class="list-content">
      <v-list-item-subtitle class="text-blue-grey-lighten-2 text-subtitle-2" v-if="title && !$slots.title">
        <slot name="title">
          {{ title }}
        </slot>
      </v-list-item-subtitle>

      <v-list-item-title class="text-blue-grey-darken-1 text-subtitle-2" v-if="content && !$slots.default">
        {{ content }}
      </v-list-item-title>

      <div class="content text-blue-grey-darken-1 text-subtitle-2 font-weight-regular">
        <template v-if="group">
          <div class="group">
            <slot default></slot>
          </div>
        </template>
        <template v-if="!group">
          <slot default></slot>
        </template>
      </div>
    </div>
  </v-list-item>
</template>

<script>
export default {
  name: 'Display Information',

  props: {
    title: {
      type: String,
      required: false,
    },
    content: {
      type: [String, Number],
      required: false,
    },
    icon: {
      type: String,
      required: false,
    },
    padding: {
      type: Boolean,
      default: () => true,
    },
    group: {
      type: Boolean,
      default: () => false,
    },
  },
  setup() {
    // console.log(props)
    return {}
  },
}
</script>
<style scoped>
.group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
