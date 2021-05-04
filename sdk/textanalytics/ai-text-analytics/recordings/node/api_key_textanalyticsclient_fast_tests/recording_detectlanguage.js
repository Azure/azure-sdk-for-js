let nock = require('nock');

module.exports.hash = "011704cf4c593ae333fe972e8b0b70bf";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1-preview.5/languages', {"documents":[{"id":"0","text":"impossible","countryHint":"fr"}]})
  .reply(200, {"documents":[{"id":"0","detectedLanguage":{"name":"English","iso6391Name":"en","confidenceScore":0.58},"warnings":[]}],"errors":[],"modelVersion":"2021-01-05"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=1,CognitiveServices.TextAnalytics.TextRecords=1',
  'x-envoy-upstream-service-time',
  '2523',
  'apim-request-id',
  '13643ce9-ab9f-463c-b768-2c491ef6b2ff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 04 May 2021 05:18:37 GMT'
]);
