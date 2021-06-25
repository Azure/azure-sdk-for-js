let nock = require('nock');

module.exports.hash = "f9f7157c7614ec76faec095e88df709e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1/entities/recognition/pii', {"documents":[{"id":"0","text":"👩‍👩‍👧‍👧 SSN: 859-98-0987","language":"en"}]})
  .query(true)
  .reply(200, {"documents":[{"redactedText":"👩‍👩‍👧‍👧 SSN: ***********","id":"0","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":13,"length":11,"confidenceScore":0.65}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=1,CognitiveServices.TextAnalytics.TextRecords=1',
  'x-envoy-upstream-service-time',
  '98',
  'apim-request-id',
  'b1e88168-4013-45d3-a554-c03428907a5c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:46:55 GMT'
]);
