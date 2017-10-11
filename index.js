const express = require('express')
const request = require('request')
const app = express()

let cache = 'Updating cache...'
let updateCache = () => {
  request.post({
    url: 'http://gap.adm.unipi.it/GAP-A-Fibonacci/newGAP-SI.cgi',
    form: {query: 'guida_oggi'}
    },
    (err, res) => {
      if (err) return console.error(err);
      cache = res;
      console.log('Cache update');
    }
  )
}
updateCache();
setInterval(updateCache, 1000*60*30)

app.get('/', function (req, res) {
  res.send(cache.body);
});

app.listen(8080, function () {
  console.log('Listening on port 8080')
});

