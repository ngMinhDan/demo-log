const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function (app) {
  app.use(
    createProxyMiddleware('/addressService', {
      target: 'http://139.180.147.199:8082',
      changeOrigin: true,
      pathRewrite: {
        '^/addressService': ''
      },
      headers: {
        Connection: 'keep-alive'
      }
    })
  )

  app.use(
    createProxyMiddleware('/accountService', {
      target: 'https://accounts.nika.guru/',
      changeOrigin: true,
      pathRewrite: {
        '^/accountService': ''
      },
      headers: {
        Connection: 'keep-alive'
      }
    })
  )

  app.use(
    createProxyMiddleware('/coinPriceService', {
      target: 'https://coinsprices.nika.guru',
      changeOrigin: true,
      pathRewrite: {
        '^/coinPriceService': ''
      },
      headers: {
        Connection: 'keep-alive'
      }
    })
  )

  app.use(
    createProxyMiddleware('/mailService', {
      target: 'https://mail.nika.guru',
      changeOrigin: true,
      pathRewrite: {
        '^/mailService': ''
      },
      headers: {
        Connection: 'keep-alive'
      }
    })
  )

  app.use(
    createProxyMiddleware('/log', {
      target: 'https://monitor.nika.guru',
      changeOrigin: true,
      pathRewrite: {
        '^/log': ''
      },
      headers: {
        Connection: 'keep-alive'
      }
    })
  )
}
