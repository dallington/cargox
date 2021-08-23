// @ts-nocheck
import { h } from 'vue'
import { mount, shallowMount } from '@vue/test-utils'

import { createVuetify } from 'vuetify'

import DisplayInformation from '@/components/DisplayInformation.vue'

const vuetify = createVuetify()

const globalSetup = {
  global: {
    plugins: [vuetify],
    // stubs: ['router-link', 'router-view'],
    // mocks: {
    //   $route,
    // },
  },
}

describe('DisplayInformation.vue', () => {
  it('render without passing props', () => {
    const wrapper = mount(DisplayInformation, {
      ...globalSetup,
    })
    expect(wrapper.classes()).toContain('v-list-item')
  })

  it('renders props title when passed', () => {
    const title = 'My Title'
    const wrapper = mount(DisplayInformation, {
      props: {
        title,
      },
      ...globalSetup,
    })
    expect(wrapper.text()).toContain(title)
  })

  it('renders props icon when passed', () => {
    const icon = 'mdi-home'
    const wrapper = mount(DisplayInformation, {
      props: {
        icon,
      },
      ...globalSetup,
    })
    const vIcon = wrapper.getComponent({ name: 'v-icon' })
    expect(vIcon.classes()).toContain(icon)
  })

  it('renders props content when passed', () => {
    const content = 'My content'
    const wrapper = mount(DisplayInformation, {
      props: {
        content,
      },
      ...globalSetup,
    })
    expect(wrapper.text()).toContain(content)
  })

  it('renders with slot default when passed', () => {
    const content = 'My content in slot'
    const wrapper = mount(DisplayInformation, {
      slots: {
        default: content,
      },
      ...globalSetup,
    })
    expect(wrapper.text()).toContain(content)
  })

  it('renders all props passed ', () => {
    const title = 'Ultimo Acesso'
    const content = 'Horario: 10/02/2021'
    const icon = 'mdi-home'

    const wrapper = mount(DisplayInformation, {
      props: {
        title,
        icon,
        content,
      },
      ...globalSetup,
    })
    const vIcon = wrapper.getComponent({ name: 'v-icon' })
    expect(wrapper.text()).toMatch(title)
    expect(wrapper.text()).toMatch(content)
    expect(vIcon.classes()).toContain(icon)
  })

  it('renders with group content ', async () => {
    const icon = 'mdi-home'
    const wrapper = mount(DisplayInformation, {
      props: {
        title: 'Group Content',
        icon,
        group: true,
      },
      slots: {
        default: DisplayInformation,
      },
      ...globalSetup,
    })

    expect(wrapper.text()).toMatch('Group Content')
    const group = wrapper.find('.group')
    expect(group.exists()).toBe(true)
  })
})
