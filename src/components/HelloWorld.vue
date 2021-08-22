<template>
  <div>
    {{ title }}
    {{ icon }}
    {{ content }}
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',

  props: {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    console.log(props)
    return {}
  },
}
</script>
