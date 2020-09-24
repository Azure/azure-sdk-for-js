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
  '65ebbec6-bce5-4144-8143-795a2a6a3100',
  'x-ms-ests-server',
  '2.1.11021.16 - CHI ProdSlices',
  'Set-Cookie',
  'fpc=AlbWQDxA4j1PhGLfQB5iL_fIIHRUAQAAAIaX9dYOAAAA; expires=Sat, 17-Oct-2020 17:44:39 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 17 Sep 2020 17:44:38 GMT',
  'Content-Length',
  '1329'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.2/keyPhrases', {"documents":[{"id":"0","text":"Hello world, thisisanextremelymassivesequenceoflettersthatislongerthansixtyfourcharacters.","language":"en"}]})
  .reply(200, {"documents":[{"id":"0","keyPhrases":["world","thisisanextremelymassivesequenceoflettersthatislongerthansixtyfo"],"warnings":[{"code":"LongWordsInDocument","message":"The document contains very long words (longer than 64 characters). These words will be truncated and may result in unreliable model predictions."}]}],"errors":[],"modelVersion":"2020-07-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=1',
  'x-envoy-upstream-service-time',
  '21',
  'apim-request-id',
  '1515e75a-bd89-4496-b8fc-6f66ad9485ba',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 17 Sep 2020 17:44:38 GMT'
]);
