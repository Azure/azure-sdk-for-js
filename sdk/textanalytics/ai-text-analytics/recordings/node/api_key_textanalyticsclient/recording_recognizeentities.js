let nock = require('nock');

module.exports.hash = "b5ff1979a37a8b5600f92fe42a4ceba6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.0/entities/recognition/general', {"documents":[{"id":"0","text":"I had a wonderful trip to Seattle last weekend.","language":"en"}]})
  .reply(200, {"documents":[{"id":"0","entities":[{"text":"trip","category":"Event","offset":18,"length":4,"confidenceScore":0.6},{"text":"Seattle","category":"Location","subcategory":"GPE","offset":26,"length":7,"confidenceScore":0.83},{"text":"last weekend","category":"DateTime","subcategory":"DateRange","offset":34,"length":12,"confidenceScore":0.8}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=1',
  'x-envoy-upstream-service-time',
  '92',
  'apim-request-id',
  'bf5053d5-324a-4685-b4cf-f0448e69e623',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 18:16:13 GMT'
]);
