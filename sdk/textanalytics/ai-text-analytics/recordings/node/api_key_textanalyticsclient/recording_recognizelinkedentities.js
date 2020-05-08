let nock = require('nock');

module.exports.hash = "37a5833d6d3fbed2e520e6fb38e85096";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.0/entities/linking', {"documents":[{"id":"0","text":"the Roman god Mars","language":"en"}]})
  .reply(200, {"documents":[{"id":"0","entities":[{"name":"Roman mythology","matches":[{"text":"Roman god","offset":4,"length":9,"confidenceScore":0.18}],"language":"en","id":"Roman mythology","url":"https://en.wikipedia.org/wiki/Roman_mythology","dataSource":"Wikipedia"}],"warnings":[]}],"errors":[],"modelVersion":"2020-02-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=1',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  '8c4a4756-c651-4b65-8ad4-575f9701579b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 08 May 2020 21:45:52 GMT'
]);
