let nock = require('nock');

module.exports.hash = "37a5833d6d3fbed2e520e6fb38e85096";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.2/entities/linking', {"documents":[{"id":"0","text":"the Roman god Mars","language":"en"}]})
  .query(true)
  .reply(200, {"documents":[{"id":"0","entities":[{"bingId":"2d00c46f-8bc6-b7da-83af-6c8eb6b1ecd2","name":"Roman mythology","matches":[{"text":"Roman god","offset":4,"length":9,"confidenceScore":0.18}],"language":"en","id":"Roman mythology","url":"https://en.wikipedia.org/wiki/Roman_mythology","dataSource":"Wikipedia"}],"warnings":[]}],"errors":[],"modelVersion":"2020-02-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=1',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  'fc0af33f-5d0a-4143-8700-74bb9a9bc14c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 16 Sep 2020 19:21:02 GMT'
]);
