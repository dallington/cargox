<template>
  <ul class="my-4 timeline" v-if="!!data.length">
    <template v-for="item in filterSteps">
      <li
        v-if="item?.step !== null"
        :key="item.status"
        :data-step-status="item.status"
        :data-step="item.step"
        :class="isCurrentStep(item.step)"
      >
        <p class="text-subtitle-2 font-weight-bold text-blue-grey-darken-2">
          {{ item.translation }}
        </p>
        <p class="mt-0 text-subtitle-2 text-blue-grey time">
          {{ item.at && formatDateAndTime(item.at, 'full') }}
        </p>
      </li>
    </template>
  </ul>
</template>

<script>
import { formatDateAndTime } from '../utils/helpers'

const steps = [
  {
    status: 'searching-truckers',
    translation: 'Procurando',
  },
  {
    status: 'trucker-selected',
    translation: 'Veículo encontrado',
  },
  {
    status: 'scheduled',
    translation: 'Agendado',
  },
  { status: 'heading-to-load', translation: 'Indo coletar' },
  { status: 'collection-queue', translation: 'Fila coleta' },
  { status: 'carrying', translation: 'Carregando' },
  { status: 'in-transit', translation: 'Em trânsito' },
  { status: 'discharge-queue', translation: 'Fila Descarga' },
  { status: 'discharge', translation: 'Descarregando' },
  { status: 'delivered', translation: 'Entregue' },
]
export default {
  name: 'Display Information',

  props: {
    data: {
      type: [Array, Object],
    },
  },
  setup(props) {
    const allSteps = Object.assign(steps, props.data)
    const stepsWithKeyStep = []
    const filterSteps = allSteps.filter((item) => {
      if (item.step) stepsWithKeyStep.push(item.step)
      return item?.step !== null
    })

    const currentStep = stepsWithKeyStep.pop()
    const isCurrentStep = (index) => {
      if (!index) return false
      return currentStep === index ? 'is-current' : 'is-complete'
    }

    return {
      filterSteps,
      isCurrentStep,
      formatDateAndTime,
    }
  },
}
</script>
<style scoped lang="scss">
@mixin tablet-and-up {
  @media screen and (min-width: 769px) {
    @content;
  }
}
@mixin mobile-and-up {
  @media screen and (min-width: 601px) {
    @content;
  }
}
@mixin tablet-and-down {
  @media screen and (max-width: 768px) {
    @content;
  }
}
@mixin mobile-only {
  @media screen and (max-width: 600px) {
    @content;
  }
}
ul,
li {
  list-style: none;
  padding: 0;
}

.timeline {
  border-radius: 12px;
  position: relative;
  --current: #1e88e5;
  --complete: #fb8c00;
}
li {
  padding-bottom: 1.5rem;
  border-left: 2px solid #e0e0e0;
  position: relative;
  padding-left: 20px;
  margin-left: 10px;
  .time {
    font-weight: 500;
  }
  &:last-child {
    border: 0px;
    padding-bottom: 0;
  }
  &:before {
    content: '';
    width: 26px;
    height: 26px;
    background: #fff;
    /* border: 4px solid #fff; */
    border-radius: 50%;
    position: absolute;
    left: -13px;
    top: 0px;
    z-index: 1;
    padding: 0;
  }
  &:after {
    content: '';
    width: 20px;
    height: 20px;
    border: 2px solid #e0e0e0;
    background: transparent;
    border-radius: 50%;
    position: absolute;
    left: -11px;
    top: 0px;
    z-index: 2;
  }
  &.is-complete {
    border-color: var(--current);
    &:after {
      background: var(--complete);
      border-color: transparent;
      content: '\F012C';
      font: normal normal normal 24px/1 'Material Design Icons';
      font-size: 12px;
      line-height: 18px;
      text-align: center;
      color: #fff;
    }
  }
  &.is-current {
    &:after {
      /* box-shadow: 3px 3px 0px #bab5f8; */
      /* box-shadow: 3px 3px 0px #bab5f8; */
      background: #fff;
      border-color: var(--current);
    }
  }
}
.time {
  color: #2a2839;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  @include mobile-and-up {
    font-size: 0.9rem;
  }
  @include mobile-only {
    margin-bottom: 0.3rem;
    font-size: 0.85rem;
  }
}
p {
  color: #4f4f4f;
  font-family: sans-serif;
  line-height: 1.5;
  margin-top: 0.4rem;
  @include mobile-only {
    font-size: 0.9rem;
  }
}
</style>
