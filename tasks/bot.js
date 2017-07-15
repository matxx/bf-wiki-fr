const nodemw = require('nodemw')
const fs = require('fs')
const path = require('path')

let bot = new nodemw({
  protocol: 'http',
  server: process.env.WIKI_DOMAIN_EU_FR,
  path: '',
  debug: true
})
const cssPath = path.join(__dirname, '..', 'dist', 'css', 'all.min.css')

function logAndExecute (callback) {
  return function(err, data) {
    if (err) { console.log(err) }
    else { callback(data) }
  }
}

bot.logIn(process.env.WIKI_BOT_USERNAME, process.env.WIKI_BOT_PASSWORD, logAndExecute(readFile))

function readFile () {
  fs.readFile(cssPath, logAndExecute(uploadCss))
}

function uploadCss (css) {
  bot.edit('MediaWiki:Test.css', css, 'update CSS', '1', function (err, data) {
    if (err) { console.log(err) }
    else {
      console.log(data)
    }
  })
}
