let nock = require('nock');

module.exports.hash = "ccbce5fd6d6bbc1f2ea2f7507f99ae07";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/entities/recognition/pii', {"documents":[{"id":"0","text":"Patient name is Joe and SSN is 859-98-0987","language":"en"}]})
  .query(true)
  .reply(200, {"documents":[{"redactedText":"Patient name is *** and SSN is ***********","id":"0","entities":[{"text":"Joe","category":"Person","offset":16,"length":3,"confidenceScore":0.79},{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":31,"length":11,"confidenceScore":0.65}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=1,CognitiveServices.TextAnalytics.TextRecords=1',
  'x-envoy-upstream-service-time',
  '28',
  'apim-request-id',
  '583be816-b611-462e-94ed-fb4fa10737d7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:36:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/entities/recognition/pii', {"documents":[{"id":"0","text":"Patient name is Joe and SSN is 859-98-0987","language":"en"}]})
  .query(true)
  .reply(200, {"documents":[{"redactedText":"Patient name is Joe and SSN is ***********","id":"0","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":31,"length":11,"confidenceScore":0.65}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=1,CognitiveServices.TextAnalytics.TextRecords=1',
  'x-envoy-upstream-service-time',
  '62',
  'apim-request-id',
  '52d213fc-8bef-4731-b594-8b86f8ea29a7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:36:42 GMT'
]);
