let nock = require('nock');

module.exports.hash = "83fb13a50e9969bc99022f3b3572b0c4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.0/languages', {"documents":[{"id":"0","text":"impossible","countryHint":"fr"}]})
  .reply(200, {"documents":[{"id":"0","detectedLanguage":{"name":"French","iso6391Name":"fr","confidenceScore":1},"warnings":[]}],"errors":[],"modelVersion":"2019-10-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=1',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '37539ab0-cc41-4076-b413-c3b9d4b4c9ed',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 17:17:34 GMT'
]);
