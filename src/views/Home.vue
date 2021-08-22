<template>
  <v-row>
    <v-col cols="8" offset-md="3">
      <v-banner icon="mdi-account">
        <h2 class="text-subtitle1">Olá - Dallington</h2>
      </v-banner>

      <v-sheet class="pa-4">
        <v-list subheader two-line>
          <template v-if="fretes.length">
            <v-subheader inset>Seus Fretes</v-subheader>
            {{ fretes }}
            <!-- <v-list-item v-for="frete in fretes" :key="frete.id">
            <v-list-item-avatar>
              <v-icon class="grey lighten-1" dark> mdi-folder </v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="folder.title"></v-list-item-title>

              <v-list-item-subtitle v-text="folder.subtitle"></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn icon>
                <v-icon color="grey lighten-1">mdi-information</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item> -->
          </template>
          <template v-if="!fretes.length">
            <v-alert type="warning" variant="text"> Você ainda não possui nenhum frete </v-alert>
            <!-- <v-list-item v-for="frete in fretes" :key="frete.id">
            <v-list-item-avatar>
              <v-icon class="grey lighten-1" dark> mdi-folder </v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="folder.title"></v-list-item-title>

              <v-list-item-subtitle v-text="folder.subtitle"></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn icon>
                <v-icon color="grey lighten-1">mdi-information</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item> -->
          </template>
        </v-list>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import { watch, ref } from 'vue'
import useFetch from '../utils/useFetch'

export default {
  name: 'Home',

  components: {},
  setup() {
    const fretes = ref([])
    const { result, isLoading, error } = useFetch('http://www.mocky.io/v2/5c7552e43100009c20c23450')
    const items = [
      { text: 'Real-Time', icon: 'mdi-clock' },
      { text: 'Audience', icon: 'mdi-account' },
      { text: 'Conversions', icon: 'mdi-flag' },
    ]

    watch(
      () => isLoading.value,
      () => {
        if (result) {
          console.log(result)
          fretes.value.push(result.value)
        }
        console.log(fretes.value)
      }
    )

    return { items, fretes, isLoading, error }
  },
}
</script>
