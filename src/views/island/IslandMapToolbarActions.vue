<script>
const EVENT_RESET = "reset";
</script>
<script setup>
import {
  DELTA_SCALE,
  EVENT_CHANGE_SCALE,
  EVENT_CHANGE_TRANSLATE,
  TRANSLATE_X,
  TRANSLATE_Y,
} from "@/services/island-map";
import { useI18n } from "vue-i18n";

const props = defineProps({
  loading: { type: Boolean, required: true },
  translateX: { type: Number, required: true },
  translateY: { type: Number, required: true },
});
const emit = defineEmits([EVENT_RESET, EVENT_CHANGE_SCALE, EVENT_CHANGE_TRANSLATE]);

const { t } = useI18n();

function onChangeScale(zoom, event) {
  let value = zoom * DELTA_SCALE;

  if (event.ctrlKey) {
    value /= 10;
  } else if (event.shiftKey) {
    value /= 2;
  }

  emit(EVENT_CHANGE_SCALE, value);
}

function onChangeTranslate(xDirection, yDirection, event) {
  let dx = 0,
    dy = 0;

  if (xDirection !== 0) {
    dx = 5 * xDirection * TRANSLATE_X;
    if (event.ctrlKey) {
      dx /= 10;
    } else if (event.shiftKey) {
      dx /= 2;
    }
  }
  if (yDirection !== 0) {
    dy = 5 * yDirection * TRANSLATE_Y;
    if (event.ctrlKey) {
      dy /= 10;
    } else if (event.shiftKey) {
      dy /= 2;
    }
  }

  emit(EVENT_CHANGE_TRANSLATE, props.translateX + dx, props.translateY + dy);
}
</script>

<template>
  <div
    class="btn-group mb-3 me-3"
    role="group"
  >
    <button
      type="button"
      class="btn btn-secondary toolbar-button"
      :disabled="loading"
      :title="t('common.zoomOut')"
      @click="onChangeScale(1, $event)"
    >
      -
    </button>
    <button
      type="button"
      class="btn btn-secondary toolbar-button"
      :disabled="loading"
      :title="t('common.zoomIn')"
      @click="onChangeScale(-1, $event)"
    >
      +
    </button>
    <button
      type="button"
      class="btn btn-secondary toolbar-button"
      :disabled="loading"
      @click="onChangeTranslate(-1, 0, $event)"
    >
      &larr;
    </button>
    <button
      type="button"
      class="btn btn-secondary toolbar-button"
      :disabled="loading"
      @click="onChangeTranslate(1, 0, $event)"
    >
      &rarr;
    </button>
    <button
      type="button"
      class="btn btn-secondary toolbar-button"
      :disabled="loading"
      @click="onChangeTranslate(0, -1, $event)"
    >
      &uarr;
    </button>
    <button
      type="button"
      class="btn btn-secondary toolbar-button"
      :disabled="loading"
      @click="onChangeTranslate(0, 1, $event)"
    >
      &darr;
    </button>
    <button
      type="button"
      class="btn btn-secondary toolbar-button"
      :title="t('common.reset')"
      :disabled="loading"
      @click="emit(EVENT_RESET)"
    >
      0
    </button>
  </div>
</template>
