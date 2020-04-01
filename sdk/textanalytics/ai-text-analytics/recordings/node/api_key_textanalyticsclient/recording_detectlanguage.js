let nock = require('nock');

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/text/analytics/v3.0-preview.1/languages', {"documents":[{"id":"0","text":"impossible","countryHint":"fr"}]})
  .reply(200, {"documents":[{"id":"0","detectedLanguages":[{"name":"French","iso6391Name":"fr","score":1}]}],"errors":[],"modelVersion":"2019-10-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=1',
  'x-envoy-upstream-service-time',
  '4',
  'apim-request-id',
  'd6ad6fb7-3e7e-4036-8fd3-6d4ebc6527f6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 05 Feb 2020 23:50:56 GMT'
]);
