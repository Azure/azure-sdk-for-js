let nock = require('nock');

module.exports.hash = "44bff596a4758107f0e456ef4454346a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/entities/recognition/general', {"documents":[{"id":"0","text":"I had a wonderful trip to Seattle last weekend.","language":"en"}]})
  .query(true)
  .reply(200, {"documents":[{"id":"0","entities":[{"text":"Seattle","category":"Location","subcategory":"GPE","offset":26,"length":7,"confidenceScore":0.99},{"text":"last weekend","category":"DateTime","subcategory":"DateRange","offset":34,"length":12,"confidenceScore":0.8}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=1,CognitiveServices.TextAnalytics.TextRecords=1',
  'x-envoy-upstream-service-time',
  '28',
  'apim-request-id',
  'ed1b0433-716e-410b-8662-68d73217e470',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:12:53 GMT'
]);
