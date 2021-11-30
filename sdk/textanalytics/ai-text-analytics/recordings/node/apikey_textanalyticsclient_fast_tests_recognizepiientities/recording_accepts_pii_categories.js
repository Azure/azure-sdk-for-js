let nock = require('nock');

module.exports.hash = "e022d94350f7224141f9cd7cdfdf4cc3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.2/entities/recognition/pii', {"documents":[{"id":"0","text":"Patient name is Joe and SSN is 859-98-0987","language":"en"}]})
  .query(true)
  .reply(200, {"documents":[{"redactedText":"Patient name is Joe and SSN is ***********","id":"0","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":31,"length":11,"confidenceScore":0.65}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=1,CognitiveServices.TextAnalytics.TextRecords=1',
  'x-envoy-upstream-service-time',
  '33',
  'apim-request-id',
  'af63e2b9-04fd-459b-aacd-d557d34e1f0b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:36:41 GMT'
]);
