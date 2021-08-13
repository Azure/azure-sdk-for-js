let nock = require('nock');

module.exports.hash = "4a211b5919e522df59e90008fad84b72";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
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
  'a32cfecf-754e-4368-b5ab-ff3eeba57a00',
  'x-ms-ests-server',
  '2.1.11787.14 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AhSHmgvHuqBPqIdBU-v27oLGLH8mAgAAAD3UTNgOAAAA; expires=Mon, 05-Jul-2021 02:11:12 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 05 Jun 2021 02:11:12 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/b206e895-80f1-4fbf-8f77-3dd2213629a8')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'b26cb025-5043-402c-b0a9-7d76bd1063e1',
  'x-envoy-upstream-service-time',
  '5405',
  'apim-request-id',
  'b26cb025-5043-402c-b0a9-7d76bd1063e1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 05 Jun 2021 02:11:17 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/b206e895-80f1-4fbf-8f77-3dd2213629a8')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'df7e325c-9685-4e55-a539-c51a68a47453',
  'x-envoy-upstream-service-time',
  '5164',
  'apim-request-id',
  'df7e325c-9685-4e55-a539-c51a68a47453',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 05 Jun 2021 02:11:23 GMT'
]);
