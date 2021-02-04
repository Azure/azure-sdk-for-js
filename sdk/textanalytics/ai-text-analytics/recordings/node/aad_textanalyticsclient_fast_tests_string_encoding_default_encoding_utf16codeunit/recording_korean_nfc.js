let nock = require('nock');

module.exports.hash = "cb0a5bf40f26a84b1647ab1a79fd772c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1331',
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
  '9606c4e3-3bb7-419b-836c-9b137f1c7100',
  'x-ms-ests-server',
  '2.1.11328.14 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Agmo6-flTvtBswChKg0GTStz_bg1AQAAAKLMftcOAAAA; expires=Fri, 29-Jan-2021 19:31:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Dec 2020 19:31:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/entities/recognition/pii', {"documents":[{"id":"0","text":"아가 SSN: 859-98-0987","language":"en"}]})
  .query(true)
  .reply(200, {"documents":[{"redactedText":"아가 SSN: ***********","id":"0","entities":[{"text":"859-98-0987","category":"U.S. Social Security Number (SSN)","offset":8,"length":11,"confidenceScore":0.65}],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=1',
  'x-envoy-upstream-service-time',
  '105',
  'apim-request-id',
  '77be5d1d-e039-4d3f-a6bb-9b71a3debd13',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 19:31:46 GMT'
]);
