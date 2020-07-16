let nock = require('nock');

module.exports.hash = "37a5833d6d3fbed2e520e6fb38e85096";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.1/entities/linking', {"documents":[{"id":"0","text":"the Roman god Mars","language":"en"}]})
  .reply(200, {"documents":[{"id":"0","entities":[{"name":"Roman mythology","matches":[{"text":"Roman god","offset":4,"length":9,"confidenceScore":0.18}],"language":"en","id":"Roman mythology","url":"https://en.wikipedia.org/wiki/Roman_mythology","dataSource":"Wikipedia"}],"warnings":[]}],"errors":[],"modelVersion":"2020-02-01"}, [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=1',
  'x-envoy-upstream-service-time',
  '25',
  'apim-request-id',
  '497f5a1c-ba7c-4594-9bb8-ed1c472d555b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 16 Jul 2020 18:39:34 GMT' ]);
