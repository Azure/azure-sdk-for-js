let nock = require('nock');

module.exports.hash = "05434aebc271891cd65b4fe50b254d3f";

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
  '790206ea-82fe-42fd-a107-6290ff73c701',
  'x-ms-ests-server',
  '2.1.10571.11 - WUS2 ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AsL24jwAqOpHs4GnSokD-jD0CyfMAQAAADFGX9YOAAAA; expires=Thu, 25-Jun-2020 17:17:38 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Tue, 26 May 2020 17:17:37 GMT',
  'Content-Length',
  '1417'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.0/languages', {"documents":[{"id":"0","text":"I use Azure Functions to develop my service.","countryHint":""}]})
  .reply(200, {"documents":[{"id":"0","detectedLanguage":{"name":"English","iso6391Name":"en","confidenceScore":1},"warnings":[]}],"errors":[],"modelVersion":"2019-10-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=1',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'e6b2e601-113e-41f6-bee9-8694c58fc17c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 17:17:37 GMT'
]);
