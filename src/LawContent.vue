<!-- LawContent.vue -->
<template>
  <div v-if="print_law">
    <div class="law-block-content-multiple">
      <p class="law-block-chapter-num">
        <span class="law-block-chapter">{{ chapter }}</span>第<span class="law-block-num">{{ num }}</span>條
        <i class="fas fa-caret-up" v-show="showLines" @click="showLines = false"></i>
        <i class="fas fa-caret-down" v-show="!showLines" @click="showLines = true"></i>
      </p>
      <ul class="law-block-lines" v-show="showLines">
        <template v-for="line in print_law.lines" :key="line">
          <div v-if="line.startsWith(' ')" class="law-indent">{{ line }}</div>
          <li v-else class="law-block-line">{{ line }}</li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import type { Law } from './types/Law'
import { loadLaw } from './types/Law'

// 從 props 取得 chapter 與 num（注意：傳入的值都是字串）
const props = defineProps<{ chapter: string; num: string }>()
const { chapter, num } = props

// 控制是否顯示詳細法條內容
const showLines = ref(true)
// 儲存載入後的法條資料
const print_law = ref<Law | null>(null)

// 使用 async setup 在組件建立時就載入法條資料
print_law.value = await loadLaw(chapter, num, "https://deploylawweb-production.up.railway.app")
</script>
