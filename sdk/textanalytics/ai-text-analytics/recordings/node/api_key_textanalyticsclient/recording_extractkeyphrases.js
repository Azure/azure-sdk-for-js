let nock = require('nock');

module.exports.hash = "176bc355ed9fbe09af6fd6793ec4c4ca";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.0/keyPhrases', {"documents":[{"id":"0","text":"I had a wonderful trip to Seattle last weekend","language":"en"}]})
  .reply(200, {"documents":[{"id":"0","keyPhrases":["wonderful trip","Seattle","weekend"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=1',
  'x-envoy-upstream-service-time',
  '312',
  'apim-request-id',
  '45d550af-2259-404a-9d47-74a5106ac336',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 04 Aug 2020 18:10:57 GMT'
]);
