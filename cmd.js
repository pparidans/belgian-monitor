import parser from './belgian-monitor-parser'

let enterpriseNumber = parser.normalizeEnterpriseNumber(process.argv[2])

parser.searchDocuments(enterpriseNumber).then(
  (documents) => console.log(documents)
).catch(
  (err) => console.error({ err })
)
