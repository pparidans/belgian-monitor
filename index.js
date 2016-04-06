import express from 'express'
import morgan from 'morgan'
import parser from './belgian-monitor-parser'
import throng from 'throng'

const WORKERS = process.env.WEB_CONCURRENCY || 1
const PORT = process.env.PORT || 3000

let start = (workerId) => {
  let app = express()
  app.set('port', PORT)
  app.use(morgan('combined'))

  app.get('/api/v1/documents/:enterpriseNumber', (req, res) => {
    let enterpriseNumber = parser.normalizeEnterpriseNumber(req.params.enterpriseNumber)

    parser.searchDocuments(enterpriseNumber).then(
      (documents) => res.json(documents)
    ).catch(
      (err) => res.status(400).json({ err })
    )
  })

  app.listen(app.get('port'), () =>
    console.log(`BelgianMonitorApi listening [${workerId}] on port ${app.get('port')}`)
  )
}

throng({
  workers: WORKERS,
  lifetime: Infinity
}, start)
