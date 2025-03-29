// src/entry-server.ts
import { createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'
import NoteContent from './NoteContent.vue'
import type { Note } from './types/Note'

export default async function renderNote(note: Note): Promise<string> {
  const app = createSSRApp({
    data: () => ({ note }),
    components: { NoteContent },
    template: `<NoteContent :theNote="note" />`
  })
  return await renderToString(app)
}

