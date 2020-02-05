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
  '5',
  'apim-request-id',
  'a9e21552-7d1c-4814-88e6-19c071d04040',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 31 Jan 2020 19:03:33 GMT'
]);
