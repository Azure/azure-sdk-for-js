let nock = require('nock');

module.exports.hash = "1ad6b9965c6e725eee13801e249e18ff";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1/entities/recognition/pii', {"documents":[{"id":"0","text":"아가 SSN: 859-98-0987","language":"en"}]})
  .query(true)
  .reply(200, {"documents":[{"redactedText":"아가 SSN: ***********","id":"0","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":8,"length":11,"confidenceScore":0.65}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=1,CognitiveServices.TextAnalytics.TextRecords=1',
  'x-envoy-upstream-service-time',
  '28',
  'apim-request-id',
  '10a32e74-4019-420c-9925-bdb373e323e3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:46:53 GMT'
]);
