const express = require('express')
const request = require('request')
const app = express()

const injected = `
<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
<script>
    $(document).ready(function () {
        $(document).scroll(function (e) {            
            $('tbody tr:gt(1) th').css({
                position: 'relative',
                left: $(document).scrollLeft(),
            });

            $('tbody tr:nth-child(2) td, tbody tr:nth-child(1) th').css({
                position: 'relative',
                top: $(document).scrollTop(),
            });
        });
    });
</script>
<style>
    html, body { margin: 0; }
</style>
`

let cache = 'Updating cache...'
let updateCache = () => {
  request.post({
    url: 'http://gap.adm.unipi.it/GAP-A-Fibonacci/newGAP-SI.cgi',
    form: {query: 'guida_oggi'}
    },
    (err, res) => {
      if (err) return console.error(err);
      cache = res.body.replace('</BODY></HTML>', injected + '</BODY></HTML>');
      console.log('Cache updated');
    }
  )
}
updateCache();
setInterval(updateCache, 1000*60*10)

app.get('/', function (req, res) {
  res.send(cache);
});

app.listen(8080, function () {
  console.log('Listening on port 8080')
});

