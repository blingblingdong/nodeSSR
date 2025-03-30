<template>
  <div :class="block.attributes?.class" v-if="print_law">
    <div class="law-block-content-multiple">
      <p class="law-block-chapter-num">
        <span class="law-block-chapter">{{ block.data.chapter }}</span>第<span class="law-block-num">{{ block.data.num
        }}</span>條
        <i class="fas fa-caret-up" v-show="showLines" @click="showLines = false"></i>
        <i class="fas fa-caret-down" v-show="!showLines" @click="showLines = true"></i>
      </p>
      <ul class='law-block-lines' v-show="showLines">
        <template v-for="line in print_law.lines">
          <div v-if="line.startsWith(' ')" class="law-indent">{{ line }}</div>
          <li v-else class="law-block-line">{{ line }}</li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, onMounted } from 'vue'
import type { Law } from '..//types/Law'
import { loadLaw } from '../types/Law'
import type { Attributes, InlineNode, Block, Note } from '../types/Note'
const ApiLink = "https://deploylawweb-production.up.railway.app"

const showLines = ref(true);


const props = defineProps<{
  block: Block
}>()
const print_law = ref<Law | null>(null);

// 使用 async setup 在 SSR 階段載入資料
if (props.block.data) {
  try {
    // 注意：這裡必須確保 loadLaw 能在 SSR 環境中運行（例如不依賴瀏覽器 API）
    print_law.value = await loadLaw(props.block.data.chapter, props.block.data.num, "https://deploylawweb-production.up.railway.app")
    console.log('Law loaded in setup:', print_law.value)
  } catch (error) {
    console.error('Error loading law in setup:', error)
  }
}


</script>

<style scoped>
.law-block {
  color: white;
  border-left: 4px solid var(--accent-color);
  margin: 10px;
  background-color: var(--gray-color);
  border-radius: 10px;
  padding: 5px 5px;
}

.multiple-block {
  color: white;
  border: 1px solid white;
  margin: 10px;
}

.law-block-chapter-num {
  display: flex;
  align-items: center;
}


.law-block-content-multiple {
  border-bottom: 0px solid white;
  margin-top: 15px;
  margin-left: 10px;
  margin-right: 5px;
}

.law-block-chapter {
  font-weight: bold;
}

.law-block-chapter:hover {
  cursor: pointer;
  color: red;
}


.law-block-lines {
  list-style-type: upper-roman !important;
}
</style>
