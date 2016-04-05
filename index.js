import parser from './belgian-monitor-parser'

const enterpriseNumber = process.argv[2] || 846419822

parser.searchDocuments(enterpriseNumber).then(
  (documents) => console.log("Documents: ", documents)
).catch(
  (err) => console.log(err)
)
