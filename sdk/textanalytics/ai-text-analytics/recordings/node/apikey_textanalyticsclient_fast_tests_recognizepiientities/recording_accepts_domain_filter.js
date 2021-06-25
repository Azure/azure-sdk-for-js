let nock = require('nock');

module.exports.hash = "0503abe68a40b8eb9a93ee2d07ce5d93";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1/entities/recognition/pii', {"documents":[{"id":"0","text":"I work at Microsoft and my phone number is 333-333-3333","language":"en"}]})
  .query(true)
  .reply(200, {"documents":[{"redactedText":"I work at ********* and my phone number is ************","id":"0","entities":[{"text":"Microsoft","category":"Organization","offset":10,"length":9,"confidenceScore":0.95},{"text":"333-333-3333","category":"PhoneNumber","offset":43,"length":12,"confidenceScore":0.8}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=1,CognitiveServices.TextAnalytics.TextRecords=1',
  'x-envoy-upstream-service-time',
  '2534',
  'apim-request-id',
  'f3f746fc-859a-4b22-93f7-6fc3685b8d96',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:46:51 GMT'
]);
