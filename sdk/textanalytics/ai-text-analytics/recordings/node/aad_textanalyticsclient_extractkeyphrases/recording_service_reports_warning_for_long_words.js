let nock = require('nock');

module.exports.hash = "140acec4cbb6fbb1a6e70ddfbb6e21df";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1329',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '9999d141-fc61-4496-bd18-999c449c0200',
  'x-ms-ests-server',
  '2.1.10985.18 - CHI ProdSlices',
  'Set-Cookie',
  'fpc=AtJx2ZcYbB1IhJz4WXz8FxnIIHRUAQAAANSb4NYOAAAA; expires=Thu, 01-Oct-2020 19:45:24 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 01 Sep 2020 19:45:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.1/keyPhrases', {"documents":[{"id":"0","text":"Hello world, thisisanextremelymassivesequenceoflettersthatislongerthansixtyfourcharacters.","language":"en"}]})
  .reply(200, {"documents":[{"id":"0","keyPhrases":["world","thisisanextremelymassivesequenceoflettersthatislongerthansixtyfo"],"warnings":[{"code":"LongWordsInDocument","message":"The document contains very long words (longer than 64 characters). These words will be truncated and may result in unreliable model predictions."}]}],"errors":[],"modelVersion":"2020-07-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=1',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  'bb2b7147-868e-4983-a545-7edecf51f17b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 01 Sep 2020 19:45:23 GMT'
]);
