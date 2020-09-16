let nock = require('nock');

module.exports.hash = "2b32efbf87f11a885dc4178930f32590";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.2/entities/recognition/pii', {"documents":[{"id":"0","text":"Your social-security number is 078-05-1120.","language":"en"}]})
  .query(true)
  .reply(200, {"documents":[{"redactedText":"Your social-security number is 078-05-1120.","id":"0","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=1',
  'x-envoy-upstream-service-time',
  '78',
  'apim-request-id',
  'cbdde0db-bb46-41fb-b02f-222f211ad9cf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 16 Sep 2020 19:21:02 GMT'
]);
