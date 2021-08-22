<template>
  <v-app class="bg-grey-lighten-3">
    <v-main>
      <v-container>
        <v-row v-if="result">
          <v-col cols="12" class="text-blue-grey-darken-1">
            <h1>{{ convertToUppercase(result.trucker.name) }}</h1>
            <p>ID do Cliente: {{ result.trucker.id }}</p>
          </v-col>
          <v-col cols="12" lg="8">
            <v-sheet class="pa-2" outlined tile elevation="0">
              <v-row>
                <v-col cols="12" sm="6">
                  <DisplayInformation title="ID do frete CargoX" icon="mdi-counter" :content="result.id" />

                  <DisplayInformation
                    title="N de pedido do cliente"
                    icon="mdi-counter"
                    :content="result.customer_tracking_number"
                  />

                  <DisplayInformation
                    title="Motorista"
                    icon="mdi-account"
                    :content="convertToUppercase(result.trucker.name)"
                  />

                  <DisplayInformation
                    title="Telefone"
                    icon="mdi-phone"
                    :content="formatPhoneNumber(result.trucker.phone)"
                  />

                  <DisplayInformation title="Aplicativo" icon="mdi-cellphone-play">
                    <ul class="ml-4 text-body-2">
                      <li>
                        Acesso:
                        {{ formatDateAndTime(result.trucker.last_app_open_at) }}
                      </li>
                      <li>
                        GPS atualizado:
                        {{ formatDateAndTime(result.trucker.last_app_position_at) }}
                      </li>
                      <li>
                        Primeiro Acesso:
                        {{ formatDateAndTime(result.trucker.first_login_at) }}
                      </li>
                      <li>
                        Versão:
                        {{ result.trucker.app_version }}
                      </li>
                    </ul>
                  </DisplayInformation>

                  <DisplayInformation title="Veículo" icon="mdi-truck">
                    <template v-for="(truck, index) in result.trucks" :key="index">
                      <p>{{ truck.type.name }} - {{ truck.plate }}</p>
                    </template>
                  </DisplayInformation>

                  <DisplayInformation title="Origem" icon="mdi-map-marker-radius">
                    <p v-html="formatAddress(result.origin)"></p>
                  </DisplayInformation>

                  <DisplayInformation title="Destino" icon="mdi-account-cog">
                    <p v-html="formatAddress(result.destination)"></p>
                  </DisplayInformation>

                  <DisplayInformation title="Operação" :content="result.trucker_seeker.name" icon="mdi-flag" />

                  <DisplayInformation title="Venda" :content="result.salesperson.name" icon="mdi-account-cash" />
                </v-col>
                <v-col cols="12" sm="6">
                  <DisplayInformation icon="mdi-calendar" group>
                    <DisplayInformation
                      title="Coleta Agendada"
                      :content="formatDateAndTime(result.pickup_date, 'full')"
                      :padding="false"
                    />

                    <DisplayInformation
                      title="Entrega Agendada"
                      :content="formatDateAndTime(result.delivery_date, 'full')"
                      :padding="false"
                    />

                    <DisplayInformation
                      title="Entrega Calculada"
                      :content="formatDateAndTime(result.estimated_time_of_arrival, 'full')"
                      :padding="false"
                    />
                    <DisplayInformation title="Entrega Calculada" :padding="false">
                      {{
                        result.manual_input_estimated_time_of_arrival
                          ? formatDateAndTime(result.manual_input_estimated_time_of_arrival, 'full')
                          : 'Sem data'
                      }}
                    </DisplayInformation>
                  </DisplayInformation>

                  <DisplayInformation title="Documentos" icon="mdi-file-document-multiple-outline">
                    <template v-for="(label, index) in result.documents" :key="index">
                      <label-tag class="ma-1" :active="isEmmited(label.status)">
                        {{ translateDocumentText(label.name) }}
                      </label-tag>
                    </template>
                  </DisplayInformation>

                  <DisplayInformation title="Pagamentos" icon="mdi-cash-multiple">
                    <template v-for="(label, index) in result.payments" :key="index">
                      <label-tag class="ma-1" :class="isPaymentOK(label.status)">
                        {{ translatePaymentText(label.name) }}
                      </label-tag>
                    </template>
                  </DisplayInformation>

                  <DisplayInformation title="Status" icon="mdi-timeline-alert">
                    <Timeline :data="result.status_history" />
                  </DisplayInformation>
                </v-col>
              </v-row>
            </v-sheet>
          </v-col>
          <v-col cols="12" lg="4">
            <v-sheet outlined tile elevation="0">
              <GoogleMap :api-key="VUE_APP_GMAPS_API_KEY" style="width: 100%; height: 500px" :zoom="7" ref="mapRef">
              </GoogleMap>
              <div class="pa-2">
                <p class="text-blue-grey-lighten-3">
                  {{ formatDateAndTime(result.trucker.last_app_update_at, 'full') }}
                </p>
              </div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
/* eslint-disable no-unused-vars */
import { reactive, watch, ref, nextTick } from 'vue'
import { GoogleMap, Marker } from 'vue3-google-map'
import { formatDateAndTime, convertToUppercase, formatPhoneNumber } from '../utils/helpers'
import DisplayInformation from '../components/DisplayInformation.vue'
import Timeline from '../components/Timeline.vue'
import LabelTag from '../components/LabelTag.vue'
import useFetch from '../utils/useFetch'

const { VUE_APP_GMAPS_API_KEY } = process.env

export default {
  name: 'App',
  components: {
    GoogleMap,
    DisplayInformation,
    Timeline,
    LabelTag,
  },
  setup() {
    const mapRef = ref(null)
    const loadingMap = ref(null)

    const { result, isLoading, error } = useFetch('https://www.mocky.io/v2/5c7552e43100009c20c23450')

    function calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB, api) {
      directionsService.route(
        {
          origin: pointA,
          destination: pointB,
          travelMode: api.TravelMode.DRIVING,
        },
        (response, status) => {
          if (status === api.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response)
          } else {
            // window.alert(`Directions request failed due to ${status}`)
          }
        }
      )
    }

    const line = null
    function centermap(markerLists) {
      const myLatLng = { lat: -25.363, lng: 131.044 }
      const gmap = mapRef.value.map
      const { api } = mapRef.value
      const bounds = new api.LatLngBounds()
      gmap.setCenter(new api.LatLng(myLatLng.lat, myLatLng.lng))
      const arrayMarker = []
      markerLists.forEach((marker) => {
        const markerr = new api.Marker({
          position: marker,
          map: gmap,
        })
        bounds.extend(markerr.position)
        arrayMarker.push(markerr)
      })

      gmap.fitBounds(bounds)

      const directionsService = new api.DirectionsService()
      const directionsDisplay = new api.DirectionsRenderer({
        map: gmap,
      })
      calculateAndDisplayRoute(directionsService, directionsDisplay, markerLists[0], markerLists[1], api)
    }

    const markerList = []
    watch(
      () => isLoading.value,
      () => {
        markerList.push({
          lat: parseFloat(result.value.origin.latitude),
          lng: parseFloat(result.value.origin.longitude),
        })
        markerList.push({
          lat: parseFloat(result.value.destination.latitude),
          lng: parseFloat(result.value.destination.longitude),
        })
      }
    )

    watch(
      () => mapRef.value,
      async () => {
        await nextTick()

        // TODO: verificar a possibilidade de remover setTimeout para previnir o erro do render
        setTimeout(() => {
          centermap(markerList)
        }, 1000)
      }
    )

    const isEmmited = (status) => status === 'emitted'

    const isPaymentOK = (status) => status === 'ok'

    const translateDocumentText = (text) => {
      const textReplace = {
        cte: 'CTe',
        mdfe: 'MDFe',
        ct: 'Contrato',
        ciot: 'CIOT',
      }
      return textReplace[text] ? textReplace[text] : text
    }

    const translatePaymentText = (text) => {
      const textReplace = {
        adia: 'Adiantamento',
        canh: 'Canhoto',
        sald: 'Saldo',
      }
      return textReplace[text] ? textReplace[text] : text
    }

    const formatAddress = (addressObj) => {
      const { address, city, number, state, zipCode } = addressObj
      return `${address}, ${number} <br> ${city} - ${state} - CEP: ${zipCode}`
    }

    console.log(VUE_APP_GMAPS_API_KEY)
    return {
      mapRef,
      result,
      isLoading,
      convertToUppercase,
      formatDateAndTime,
      formatPhoneNumber,
      isEmmited,
      isPaymentOK,
      translatePaymentText,
      translateDocumentText,
      formatAddress,
      VUE_APP_GMAPS_API_KEY,
    }
  },
}
</script>
