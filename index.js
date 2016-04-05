const parser = require('./belgian-monitor-parser')

const enterpriseNumber = 870855508

parser.searchDocuments(enterpriseNumber).then( (documents) => console.log("Documents: ", documents) ).catch( (err) => console.log(err) )
