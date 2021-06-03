let nock = require('nock');

module.exports.hash = "b2209a17485822432cf80b656050872d";

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
  'ea633f5a-8e70-491d-a713-ae55cc1c0900',
  'x-ms-ests-server',
  '2.1.11787.14 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Ao3LGmWoTnxIo4o1diRecJfGLH8mBQAAAFgUStgOAAAA; expires=Sat, 03-Jul-2021 00:08:41 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 03 Jun 2021 00:08:40 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/40d95108-fed5-4182-ae11-8632b16a6df1')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '6af7dc7b-be82-4cc2-8d2d-fbbfb7618c72',
  'x-envoy-upstream-service-time',
  '335',
  'apim-request-id',
  '6af7dc7b-be82-4cc2-8d2d-fbbfb7618c72',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 03 Jun 2021 00:08:41 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/40d95108-fed5-4182-ae11-8632b16a6df1')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '78f40055-ffee-4f54-91e3-3bf8977297c8',
  'x-envoy-upstream-service-time',
  '133',
  'apim-request-id',
  '78f40055-ffee-4f54-91e3-3bf8977297c8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 03 Jun 2021 00:08:41 GMT'
]);
