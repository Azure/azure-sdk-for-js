let nock = require('nock');

module.exports.hash = "e40bb513091188e28d17eae5526eeedc";

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
  '2d52ee76-fcd2-482e-ad05-60f8a6be9d00',
  'x-ms-ests-server',
  '2.1.11021.16 - CHI ProdSlices',
  'Set-Cookie',
  'fpc=Ap60BaS-5zZMkikOUBiHUaXIIHRUAQAAAI2X9dYOAAAA; expires=Sat, 17-Oct-2020 17:44:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 17 Sep 2020 17:44:46 GMT',
  'Content-Length',
  '1329'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.2/entities/recognition/pii', {"documents":[{"id":"0","text":"Your Social Security Number is 859-98-0987.","language":"en"}]})
  .query(true)
  .reply(200, {"documents":[{"redactedText":"Your Social Security Number is ***********.","id":"0","entities":[{"text":"859-98-0987","category":"U.S. Social Security Number (SSN)","offset":31,"length":11,"confidenceScore":0.65}],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=1',
  'x-envoy-upstream-service-time',
  '1936',
  'apim-request-id',
  '8ca4e25e-c3df-4411-b7d8-3d47763120b1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 17 Sep 2020 17:44:47 GMT'
]);
