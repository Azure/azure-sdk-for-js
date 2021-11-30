let nock = require('nock');

module.exports.hash = "ef69fca0065615995d37fba2821ced2e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.2/languages', {"documents":[{"id":"0","text":"I use Azure Functions to develop my service.","countryHint":""}]})
  .reply(200, {"documents":[{"id":"0","detectedLanguage":{"name":"English","iso6391Name":"en","confidenceScore":0.95},"warnings":[]}],"errors":[],"modelVersion":"2021-01-05"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=1,CognitiveServices.TextAnalytics.TextRecords=1',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '06ac8865-eb7b-4caa-bd87-f21c2460f777',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:36:37 GMT'
]);
