let nock = require('nock');

module.exports.hash = "39d767990aa13284c06a99b13d97e5ad";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1-preview.5/entities/recognition/pii', {"documents":[{"id":"0","text":"Your social-security number is 078-05-1120.","language":"en"}]})
  .query(true)
  .reply(200, {"documents":[{"redactedText":"Your social-security number is 078-05-1120.","id":"0","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=1,CognitiveServices.TextAnalytics.TextRecords=1',
  'x-envoy-upstream-service-time',
  '2542',
  'apim-request-id',
  '3547aced-639f-40bc-966d-189d13adca33',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:03:47 GMT'
]);
