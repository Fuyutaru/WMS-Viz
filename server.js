import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'

const app = express()

// Enable CORS on proxy responses
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})

app.use('/proxy', (req, res, next) => {
  const target = req.query.target
  if (!target) {
    res.status(400).send('Missing ?target= param')
    return
  }

  return createProxyMiddleware({
    target,
    changeOrigin: true,
    secure: false,
    pathRewrite: { '^/proxy': '' }
  })(req, res, next)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`✅ Proxy running at http://localhost:${PORT}/proxy`)
})
