let nock = require('nock');

module.exports.hash = "3329879bc0c7f14471144f11befb757c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/keyPhrases', {"documents":[{"id":"0","text":"I had a wonderful trip to Seattle last weekend","language":"en"}]})
  .reply(200, {"documents":[{"id":"0","keyPhrases":["wonderful trip","Seattle","weekend"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=1',
  'x-envoy-upstream-service-time',
  '785',
  'apim-request-id',
  '629f9ee3-e9c8-43c9-abb5-827c6fd286ac',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:34:31 GMT'
]);
