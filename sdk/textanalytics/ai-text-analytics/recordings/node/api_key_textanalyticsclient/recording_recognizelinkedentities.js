let nock = require('nock');

module.exports.hash = "37a5833d6d3fbed2e520e6fb38e85096";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.1/entities/linking', {"documents":[{"id":"0","text":"the Roman god Mars","language":"en"}]})
  .reply(200, {"documents":[{"id":"0","entities":[{"name":"Roman mythology","matches":[{"text":"Roman god","offset":4,"length":9,"confidenceScore":0.18}],"language":"en","id":"Roman mythology","url":"https://en.wikipedia.org/wiki/Roman_mythology","dataSource":"Wikipedia"}],"warnings":[]}],"errors":[],"modelVersion":"2020-02-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=1',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  '8de889d6-b5cc-42d8-870a-e8277da80aad',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 11 Aug 2020 14:18:24 GMT'
]);
