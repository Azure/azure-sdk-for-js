let nock = require('nock');

module.exports.hash = "2b32efbf87f11a885dc4178930f32590";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.1/entities/recognition/pii', {"documents":[{"id":"0","text":"Your social-security number is 078-05-1120.","language":"en"}]})
  .reply(200, {"documents":[{"id":"0","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=1',
  'x-envoy-upstream-service-time',
  '995',
  'apim-request-id',
  '3b8365a3-d842-4516-b417-ed2e2d895473',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 14 Aug 2020 17:48:30 GMT'
]);
