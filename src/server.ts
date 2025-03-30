// src/server.ts
import express, { Request, Response } from 'express'
import { createServer as createViteServer } from 'vite'
import path from 'path'

async function startServer() {
  const app = express()
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

  const port = process.env.PORT || 3000
  app.listen(port, () => {
    console.log(`SSR service is listening on port ${port}`)
  })
}

startServer()
