let nock = require('nock');

module.exports.hash = "64cf5c6126184b4197c02d4fc2aa63fc";

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
  '90658743-33a3-480b-add6-0e459fe80900',
  'x-ms-ests-server',
  '2.1.11787.14 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ao3LGmWoTnxIo4o1diRecJfGLH8mCAAAAFgUStgOAAAA; expires=Sat, 03-Jul-2021 00:09:54 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 03 Jun 2021 00:09:53 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/ae07c304-2014-44db-9830-83e88f2fa69d')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'f3ff5745-c8bf-403c-b47a-6b5051b38ed9',
  'x-envoy-upstream-service-time',
  '5406',
  'apim-request-id',
  'f3ff5745-c8bf-403c-b47a-6b5051b38ed9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 03 Jun 2021 00:09:59 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/ae07c304-2014-44db-9830-83e88f2fa69d')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f6535e6c-f05d-422e-b87d-4c3797b31b93',
  'x-envoy-upstream-service-time',
  '5242',
  'apim-request-id',
  'f6535e6c-f05d-422e-b87d-4c3797b31b93',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 03 Jun 2021 00:10:05 GMT'
]);
