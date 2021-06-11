let nock = require('nock');

module.exports.hash = "797af05c28fecaa61519a9b263d973c9";

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
  'e667f670-b5df-48df-aa74-fe36db796b00',
  'x-ms-ests-server',
  '2.1.11787.14 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AhSHmgvHuqBPqIdBU-v27oLGLH8mBAAAAD3UTNgOAAAA; expires=Mon, 05-Jul-2021 02:11:30 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 05 Jun 2021 02:11:30 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/d161fb73-253a-489d-a96e-b2e96ec019dc')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'e2e1c8ba-63e8-45db-b66b-56e515983d69',
  'x-envoy-upstream-service-time',
  '375',
  'apim-request-id',
  'e2e1c8ba-63e8-45db-b66b-56e515983d69',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 05 Jun 2021 02:11:30 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/d161fb73-253a-489d-a96e-b2e96ec019dc')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'faa1f333-f179-4be8-869c-08c417eadf2e',
  'x-envoy-upstream-service-time',
  '5098',
  'apim-request-id',
  'faa1f333-f179-4be8-869c-08c417eadf2e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 05 Jun 2021 02:11:35 GMT'
]);
