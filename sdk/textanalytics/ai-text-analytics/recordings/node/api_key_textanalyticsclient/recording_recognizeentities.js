let nock = require('nock');

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/text/analytics/v3.0-preview.1/entities/recognition/general', {"documents":[{"id":"0","text":"I had a wonderful trip to Seattle last weekend.","language":"en"}]})
  .reply(200, {"documents":[{"id":"0","entities":[{"text":"Seattle","type":"Location","offset":26,"length":7,"score":0.9293757081031799},{"text":"last weekend","type":"DateTime","subtype":"DateRange","offset":34,"length":12,"score":0.8}]}],"errors":[],"modelVersion":"2019-10-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=1',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  'f56064a5-72a2-42bb-86d7-8767fe25826d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 31 Jan 2020 19:03:34 GMT'
]);
