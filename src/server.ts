// src/server.ts
import express, { Request, Response } from 'express'
import { createServer as createViteServer } from 'vite'
import path from 'path'
import { createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'
import LawContent from './LawContent.vue'
import cors from 'cors' // 直接使用 import 方式

async function startServer() {
  const app = express()
  app.use(cors({
    origin: '*'
  }));
  app.use(express.json({ limit: '50mb' }))

  // 建立 Vite 開發服務器（中介模式）
  const vite = await createViteServer({
    server: { middlewareMode: 'ssr' },
    appType: 'custom'
  })
  app.use(vite.middlewares)

  app.post('/render-note', async (req: Request, res: Response) => {
    try {
      const note = req.body  // 假設 JSON 本身就是 note 物件
      if (!note) {
        return res.status(400).send("Missing note data")
      }
      // 動態載入 entry-server 模組，並從 default 屬性取出 renderNote
      const { default: renderNote } = await vite.ssrLoadModule('/src/entry-server.ts')
      const html = await renderNote(note)
      res.status(200).send(html)
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  })

  app.get('/render-law/:chapter/:num', async (req: Request, res: Response) => {
    const { chapter, num } = req.params
    try {
      // 建立 SSR Vue 應用，並將 chapter 與 num 作為 props 傳入 LawContent
      const vueApp = createSSRApp({
        data: () => ({ chapter, num }),
        // 使用 LawContent 組件並傳入 props
        template: `<LawContent :chapter="chapter" :num="num" />`,
        components: { LawContent }
      })
      const html = await renderToString(vueApp)
      res.send(html)
    } catch (err: any) {
      console.error('SSR render error:', err)
      res.status(500).send(err.toString())
    }
  })

  const port = process.env.PORT || 3000
  app.listen(port, () => {
    console.log(`SSR service is listening on port ${port}`)
  })
}

startServer()
