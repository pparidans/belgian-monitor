'use strict';

const jsdom = require('jsdom')
const moment = require('moment')
const url = require('url')

const baseUrl = (enterpriseNumber) => `http://www.ejustice.just.fgov.be/cgi_tsv/tsv_l_1.pl?lang=fr&sql=btw+contains+%27${enterpriseNumber}%27&fromtab=TSV&rech=1&pdda=&pddm=&pddj=&pdfa=&pdfm=&pdfj=&naam=&postkode=&localite=&numpu=&hrc=&akte=&btw=${enterpriseNumber}&jvorm=&land=&set2=&set3=`

let searchUrl = baseUrl(870855508)

console.log(`URL: ${searchUrl}`)

jsdom.env({
  url: searchUrl,
  done: (err, window) => {
    let docs = Array.prototype.slice.call(window.document.querySelectorAll('center table tr td:nth-child(2)'))
    console.log(`Number of documents found: ${docs.length}`)
    let documentsList = docs.map( (doc) => {
        let parts = doc.innerHTML.split('<br>').slice(3)
        let title = parts[0].trim()
        let linkNode = doc.querySelector('a')
        let link = linkNode ? url.resolve(searchUrl, linkNode.getAttribute('href')) : null
        let publishedAt = moment(parts[1].slice(0, 10)).toDate()
        return { title, publishedAt, link }
    })
    console.log('Documents: ', documentsList)
  }
})
