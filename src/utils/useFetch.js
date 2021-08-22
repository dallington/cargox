import { ref, reactive, toRefs } from 'vue'

const defaultOptions = {
  method: 'get',
  headers: {
    'content-type': 'application/json',
  },
}
function useFetch(url, options = {}) {
  const state = reactive({
    isLoading: false,
    error: null,
  })
  const result = ref(null)

  const userOptions = { ...defaultOptions, ...options }
  const getFetch = async () => {
    state.isLoading = true
    try {
      const res = await fetch(url, userOptions)
      const data = await res.json()
      result.value = data
    } catch (err) {
      state.error = err
    } finally {
      state.isLoading = false
    }
  }

  getFetch()

  return { result, ...toRefs(state), getFetch }
}

export default useFetch
