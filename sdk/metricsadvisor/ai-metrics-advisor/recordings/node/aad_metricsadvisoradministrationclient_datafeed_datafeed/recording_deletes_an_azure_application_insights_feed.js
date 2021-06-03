let nock = require('nock');

module.exports.hash = "649ff33f6dd8c7706f7f70061b6b7b8e";

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
  'a0d38bee-78ce-4857-86b2-d3f4d4700e00',
  'x-ms-ests-server',
  '2.1.11787.14 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Ao3LGmWoTnxIo4o1diRecJfGLH8mBAAAAFgUStgOAAAA; expires=Sat, 03-Jul-2021 00:08:30 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 03 Jun 2021 00:08:30 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/5917f2d4-ac54-452c-8db2-bde8be040499')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'd6e74660-00d0-46ac-962f-7a278a5b6fdb',
  'x-envoy-upstream-service-time',
  '5344',
  'apim-request-id',
  'd6e74660-00d0-46ac-962f-7a278a5b6fdb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 03 Jun 2021 00:08:35 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/5917f2d4-ac54-452c-8db2-bde8be040499')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'ec9aa3d0-ef6f-4c6e-9b4a-c8d8b4604198',
  'x-envoy-upstream-service-time',
  '5122',
  'apim-request-id',
  'ec9aa3d0-ef6f-4c6e-9b4a-c8d8b4604198',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 03 Jun 2021 00:08:40 GMT'
]);
