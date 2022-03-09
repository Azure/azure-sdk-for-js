let nock = require('nock');

module.exports.hash = "0503abe68a40b8eb9a93ee2d07ce5d93";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.2/entities/recognition/pii', {"documents":[{"id":"0","text":"I work at Microsoft and my phone number is 333-333-3333","language":"en"}]})
  .query(true)
  .reply(200, {"documents":[{"redactedText":"I work at ********* and my phone number is ************","id":"0","entities":[{"text":"Microsoft","category":"Organization","offset":10,"length":9,"confidenceScore":0.94},{"text":"333-333-3333","category":"PhoneNumber","offset":43,"length":12,"confidenceScore":0.8}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=1,CognitiveServices.TextAnalytics.TextRecords=1',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  '618b18ec-1138-47f5-baef-8e88f6a1f1db',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:36:40 GMT'
]);
