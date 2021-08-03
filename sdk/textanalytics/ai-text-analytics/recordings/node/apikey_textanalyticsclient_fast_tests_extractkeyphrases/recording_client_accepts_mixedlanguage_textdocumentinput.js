let nock = require('nock');

module.exports.hash = "ff532ec002c3a730a118f602c709956e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1/keyPhrases', {"documents":[{"id":"1","text":"I had a wonderful trip to Seattle last week and even visited the Space Needle 2 times!","language":"en"},{"id":"2","text":"Unfortunately, it rained during my entire trip to Seattle. I didn't even get to visit the Space Needle","language":"en"},{"id":"3","text":"I went to see a movie on Saturday and it was perfectly average, nothing more or less than I expected.","language":"en"},{"id":"4","text":"I didn't like the last book I read at all.","language":"en"},{"id":"5","text":"Los caminos que llevan hasta Monte Rainier son espectaculares y hermosos.","language":"es"},{"id":"6","text":"La carretera estaba atascada. Había mucho tráfico el día de ayer.","language":"es"}]})
  .reply(200, {"documents":[{"id":"1","keyPhrases":["wonderful trip","Space Needle","Seattle"],"warnings":[]},{"id":"2","keyPhrases":["entire trip","Seattle","Space","Needle"],"warnings":[]},{"id":"3","keyPhrases":["movie","Saturday"],"warnings":[]},{"id":"4","keyPhrases":["last book"],"warnings":[]},{"id":"5","keyPhrases":["Los","caminos","Monte","Rainier"],"warnings":[]},{"id":"6","keyPhrases":["mucho tráfico","carretera","ayer"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=6,CognitiveServices.TextAnalytics.TextRecords=6',
  'x-envoy-upstream-service-time',
  '5044',
  'apim-request-id',
  'b99cee53-4013-47e0-a4a8-2d6af09a16f0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:46:33 GMT'
]);
