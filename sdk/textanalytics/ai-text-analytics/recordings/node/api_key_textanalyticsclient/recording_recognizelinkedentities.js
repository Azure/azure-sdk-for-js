let nock = require('nock');

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/text/analytics/v3.0-preview.1/entities/linking', {"documents":[{"id":"0","text":"the Roman god Mars","language":"en"}]})
  .reply(200, {"documents":[{"id":"0","entities":[{"name":"Roman mythology","matches":[{"text":"Roman god","offset":4,"length":9,"score":0.14383482284582527}],"language":"en","id":"Roman mythology","url":"https://en.wikipedia.org/wiki/Roman_mythology","dataSource":"Wikipedia"}]}],"errors":[],"modelVersion":"2019-10-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=1',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '5b1c3c02-87f9-46c6-b1ce-5c78c3ce0767',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 31 Jan 2020 19:03:34 GMT'
]);
