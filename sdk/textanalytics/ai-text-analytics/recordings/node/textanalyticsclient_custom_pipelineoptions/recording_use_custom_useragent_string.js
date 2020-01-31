let nock = require('nock');

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/text/analytics/v3.0-preview.1/languages', {"documents":[{"id":"0","text":"Hello!","countryHint":"us"}]})
  .reply(200, {"documents":[{"id":"0","detectedLanguages":[{"name":"English","iso6391Name":"en","score":1}]}],"errors":[],"modelVersion":"2019-10-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=1',
  'x-envoy-upstream-service-time',
  '4',
  'apim-request-id',
  '894286c9-591e-4c70-b7f1-ef340ecd0d91',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 31 Jan 2020 19:03:34 GMT'
]);
