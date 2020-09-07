let nock = require('nock');

module.exports.hash = "b5ff1979a37a8b5600f92fe42a4ceba6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.1/entities/recognition/general', {"documents":[{"id":"0","text":"I had a wonderful trip to Seattle last weekend.","language":"en"}]})
  .query(true)
  .reply(200, {"documents":[{"id":"0","entities":[{"text":"trip","category":"Event","offset":18,"length":4,"confidenceScore":0.6},{"text":"Seattle","category":"Location","subcategory":"GPE","offset":26,"length":7,"confidenceScore":0.83},{"text":"last weekend","category":"DateTime","subcategory":"DateRange","offset":34,"length":12,"confidenceScore":0.8}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=1',
  'x-envoy-upstream-service-time',
  '83',
  'apim-request-id',
  '98e7f5fa-287e-4333-9f24-89699891f290',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Sep 2020 23:53:36 GMT'
]);
