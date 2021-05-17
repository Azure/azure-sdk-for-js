let nock = require('nock');

module.exports.hash = "14054da5863782c4fc6a8a675748b72d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
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
  '827342a8-18bf-48da-be41-1203884dd900',
  'x-ms-ests-server',
  '2.1.11722.21 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AinGrRGBzI5Mg73OLQslIGHGLH8mCAAAAAZAMdgOAAAA; expires=Mon, 14-Jun-2021 04:08:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 15 May 2021 04:08:46 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/761ed532-039d-447a-967f-3885c070ae32')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'f68abe84-4704-44a4-8112-40a1d2560768',
  'x-envoy-upstream-service-time',
  '5232',
  'apim-request-id',
  'f68abe84-4704-44a4-8112-40a1d2560768',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:08:51 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/761ed532-039d-447a-967f-3885c070ae32')
  .reply(404, {"code":"Not Found","message":"Not found this AnomalyDetectionConfiguration. TraceId: 3f524ce3-8cba-475d-934c-163bdddddc21"}, [
  'Content-Length',
  '124',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '9e2936a4-de1c-4f6a-8c30-c67059f133d0',
  'x-envoy-upstream-service-time',
  '188',
  'apim-request-id',
  '9e2936a4-de1c-4f6a-8c30-c67059f133d0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:08:51 GMT'
]);
