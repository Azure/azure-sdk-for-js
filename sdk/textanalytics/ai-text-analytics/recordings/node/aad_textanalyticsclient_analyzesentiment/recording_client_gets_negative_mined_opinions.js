let nock = require('nock');

module.exports.hash = "15598c03a2c2d7c0fbff2437d75a8ee5";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
  'Cache-Control',
  'no-cache, no-store',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-request-id',
  '9c4014cb-305c-45f5-a5df-03c6554feb00',
  'x-ms-ests-server',
  '2.1.10922.14 - CHI ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AoE11MbV4q1IiTFYPI_3xFT0CyfMAQAAALefxNYOAAAA; expires=Thu, 10-Sep-2020 14:18:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Tue, 11 Aug 2020 14:18:30 GMT',
  'Content-Length',
  '1417'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.1/sentiment', {"documents":[{"id":"0","text":"The food and service is not good","language":"en"}]})
  .query(true)
  .reply(200, {"documents":[{"id":"0","sentiment":"negative","confidenceScores":{"positive":0,"neutral":0,"negative":1},"sentences":[{"sentiment":"negative","confidenceScores":{"positive":0,"neutral":0,"negative":1},"offset":0,"length":32,"text":"The food and service is not good","aspects":[{"sentiment":"negative","confidenceScores":{"positive":0.01,"negative":0.99},"offset":4,"length":4,"text":"food","relations":[{"relationType":"opinion","ref":"#/documents/0/sentences/0/opinions/0"}]},{"sentiment":"negative","confidenceScores":{"positive":0.01,"negative":0.99},"offset":13,"length":7,"text":"service","relations":[{"relationType":"opinion","ref":"#/documents/0/sentences/0/opinions/0"}]}],"opinions":[{"sentiment":"negative","confidenceScores":{"positive":0.01,"negative":0.99},"offset":28,"length":4,"text":"good","isNegated":true}]}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=1',
  'x-envoy-upstream-service-time',
  '86',
  'apim-request-id',
  'df9e7b8b-dcc0-4f45-8338-2034e5416aca',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 11 Aug 2020 14:18:31 GMT'
]);
