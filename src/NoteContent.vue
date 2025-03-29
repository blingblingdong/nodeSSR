// NoteContent.vue
<template>
  <div v-if="theNote">
    <component v-for="(block, index) in theNote.content" :key="index" :is="getComponent(block.type)" :block="block" />
  </div>
</template>

<script lang="ts">
import type { Note } from './types/Note'
import ParagraphBlock from './BlockCon/ParagraphBlock.vue';
import CustomCardBlock from './BlockCon/CustomCardBlock.vue'
import BlockQuoteBlock from './BlockCon/BlockQuoteBlock.vue'
import H2Block from './BlockCon/H2Block.vue'
import H3Block from './BlockCon/H3Block.vue'
import FigureBlock from './BlockCon/FigureBlock.vue'
import { defineComponent, PropType } from 'vue'

// 假設 theNote 是以 prop 傳入

const componentMap: Record<string, any> = {
  paragraph: ParagraphBlock,
  custom_card: CustomCardBlock,
  block_quote: BlockQuoteBlock,
  h2: H2Block,
  h3: H3Block,
  figure: FigureBlock,
}

const getComponent = (type: string) => {
  return componentMap[type] || ParagraphBlock
}

export default defineComponent({
  name: 'NoteContent',
  props: {
    theNote: {
      type: Object as PropType<Note>,
      required: true
    }
  },
  methods: {
    getComponent(type: string) {
      return componentMap[type] || ParagraphBlock
    }
  }
})
</script>
