let nock = require('nock');

module.exports.hash = "19d463bf24294c0722d9b50c8847d7b1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.0/languages', {"documents":[{"id":"1","text":"I had a wonderful trip to Seattle last week and even visited the Space Needle 2 times!"},{"id":"2","text":"Unfortunately, it rained during my entire trip to Seattle. I didn't even get to visit the Space Needle"},{"id":"3","text":"I went to see a movie on Saturday and it was perfectly average, nothing more or less than I expected."},{"id":"4","text":"I didn't like the last book I read at all."},{"id":"5","text":"Los caminos que llevan hasta Monte Rainier son espectaculares y hermosos.","countryHint":"mx"},{"id":"6","text":"La carretera estaba atascada. Había mucho tráfico el día de ayer.","countryHint":"mx"}]})
  .reply(200, {"documents":[{"id":"1","detectedLanguage":{"name":"English","iso6391Name":"en","confidenceScore":1},"warnings":[]},{"id":"2","detectedLanguage":{"name":"English","iso6391Name":"en","confidenceScore":1},"warnings":[]},{"id":"3","detectedLanguage":{"name":"English","iso6391Name":"en","confidenceScore":1},"warnings":[]},{"id":"4","detectedLanguage":{"name":"English","iso6391Name":"en","confidenceScore":1},"warnings":[]},{"id":"5","detectedLanguage":{"name":"Spanish","iso6391Name":"es","confidenceScore":1},"warnings":[]},{"id":"6","detectedLanguage":{"name":"Spanish","iso6391Name":"es","confidenceScore":1},"warnings":[]}],"errors":[],"modelVersion":"2019-10-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=6',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'ab64050b-6f9d-46ed-9629-a888fa6aba6a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 19 May 2020 20:33:31 GMT'
]);
