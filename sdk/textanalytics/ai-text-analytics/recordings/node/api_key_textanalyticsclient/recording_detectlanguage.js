let nock = require('nock');

module.exports.hash = "83fb13a50e9969bc99022f3b3572b0c4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.0/languages', {"documents":[{"id":"0","text":"impossible","countryHint":"fr"}]})
  .reply(200, {"documents":[{"id":"0","detectedLanguage":{"name":"French","iso6391Name":"fr","confidenceScore":1},"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=1',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  'a1d5903a-7904-48ab-b597-50b03915c1dd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 04 Aug 2020 18:10:57 GMT'
]);
