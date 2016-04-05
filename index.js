import express from 'express'
import morgan from 'morgan'
import parser from './belgian-monitor-parser'

let app = express()
app.set('port', process.env.PORT || 3000)
app.use(morgan('combined'))

app.get('/api/v1/documents/:enterpriseNumber', (req, res) => {
  let enterpriseNumber = String(req.params.enterpriseNumber || "")
  let normalized = parseInt(enterpriseNumber.replace(/\D/g, ""), 10)

  parser.searchDocuments(normalized).then(
    (documents) => res.json(documents)
  ).catch(
    (err) => res.status(400).json({ err })
  )
})

app.listen(app.get('port'), () =>
  console.log(`BelgianMonitorApi listening on port ${app.get('port')}`)
)
