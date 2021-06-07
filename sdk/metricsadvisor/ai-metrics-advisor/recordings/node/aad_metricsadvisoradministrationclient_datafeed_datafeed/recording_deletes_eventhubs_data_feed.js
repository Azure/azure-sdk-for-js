let nock = require('nock');

module.exports.hash = "8db789c5a43bf8d7e9c8ff57f96724c2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fsanitized%2F")
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
  'b1e3b71e-7805-4038-a226-cc8e7c6f6500',
  'x-ms-ests-server',
  '2.1.11787.14 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AmLQSFzZ3NtIncXgUaZsx9HGLH8mAgAAAO3sTNgOAAAA; expires=Mon, 05-Jul-2021 03:56:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 05 Jun 2021 03:56:37 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/d14eb6dc-6761-491d-bf79-d3279080f70d')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '293c7964-b109-4123-86cc-ea20f39e3ef4',
  'x-envoy-upstream-service-time',
  '5590',
  'apim-request-id',
  '293c7964-b109-4123-86cc-ea20f39e3ef4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 05 Jun 2021 03:56:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/d14eb6dc-6761-491d-bf79-d3279080f70d')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'fee8363d-582a-4c16-9f94-fd67d7db5423',
  'x-envoy-upstream-service-time',
  '5138',
  'apim-request-id',
  'fee8363d-582a-4c16-9f94-fd67d7db5423',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 05 Jun 2021 03:56:47 GMT'
]);
