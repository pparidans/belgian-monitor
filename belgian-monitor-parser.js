'use strict';

const jsdom = require('jsdom')
const moment = require('moment')
const url = require('url')

const buildUrl = (enterpriseNumber) => `http://www.ejustice.just.fgov.be/cgi_tsv/tsv_l_1.pl?lang=fr&sql=btw+contains+%27${enterpriseNumber}%27&fromtab=TSV&rech=1&pdda=&pddm=&pddj=&pdfa=&pdfm=&pdfj=&naam=&postkode=&localite=&numpu=&hrc=&akte=&btw=${enterpriseNumber}&jvorm=&land=&set2=&set3=`

const searchDocuments = (enterpriseNumber) => new Promise( (resolve, reject) => {
  const searchUrl = buildUrl(enterpriseNumber)
  console.log(`URL: ${searchUrl}`)
  jsdom.env({
    url: searchUrl,
    done: (err, window) => {
      if(err) {
        reject(err)
      }
      const docs = Array.prototype.slice.call(window.document.querySelectorAll('center table tr td:nth-child(2)'))
      console.log(`Number of documents found: ${docs.length}`)
      const documentsList = docs.map( (doc) => {
          const parts = doc.innerHTML.split('<br>').slice(3)
          const title = parts[0].trim()
          const linkNode = doc.querySelector('a')
          const link = linkNode ? url.resolve(searchUrl, linkNode.getAttribute('href')) : null
          const publishedAt = moment(parts[1].slice(0, 10)).toDate()
          return { title, publishedAt, link }
      })
      resolve(documentsList)
    }
  })
})

module.exports = { searchDocuments }
