let nock = require('nock');

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/text/analytics/v3.0-preview.1/entities/recognition/pii', {"documents":[{"id":"0","text":"Your social-security number is 078-05-1120.","language":"en"}]})
  .reply(200, {"documents":[{"id":"0","entities":[{"text":"078-05-1120","type":"U.S. Social Security Number (SSN)","subtype":"","offset":31,"length":11,"score":0.4}]}],"errors":[],"modelVersion":"2019-10-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=1',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '26208cee-3e7f-42ba-996c-cbd8d4b3021f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 31 Jan 2020 19:03:33 GMT'
]);
