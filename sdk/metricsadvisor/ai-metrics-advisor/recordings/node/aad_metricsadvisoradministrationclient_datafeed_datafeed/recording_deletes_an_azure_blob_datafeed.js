let nock = require('nock');

module.exports.hash = "d9c318776ee205ffe269de16d9c70f34";

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
  '201c79b6-a5d2-42b4-ab36-dbd609d28900',
  'x-ms-ests-server',
  '2.1.12197.4 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=An6nxAPpF6NAm4PSpKgSzVXGLH8mAQAAAO6YGtkOAAAA; expires=Wed, 08-Dec-2021 04:05:03 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 08 Nov 2021 04:05:02 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/f6550179-af42-4258-9c51-1681f240b93a')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '96ad0e16-b39c-4b7c-9fb8-16e6cf9af503',
  'x-envoy-upstream-service-time',
  '299',
  'apim-request-id',
  '96ad0e16-b39c-4b7c-9fb8-16e6cf9af503',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:03 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/f6550179-af42-4258-9c51-1681f240b93a')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '3aa1a48c-0e71-424c-8605-ccb5dcbce272',
  'x-envoy-upstream-service-time',
  '185',
  'apim-request-id',
  '3aa1a48c-0e71-424c-8605-ccb5dcbce272',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:03 GMT'
]);
