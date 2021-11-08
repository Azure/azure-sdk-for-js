let nock = require('nock');

module.exports.hash = "d334d4a48f14d26f57ffddc91b746e6e";

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
  '191a7fb5-77e3-4555-8767-a30a95b99400',
  'x-ms-ests-server',
  '2.1.12197.4 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=An0x2uyaEFNHl2N-sSL9hMo; expires=Wed, 08-Dec-2021 04:05:08 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 08 Nov 2021 04:05:08 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/9628395a-72c5-4765-bd0e-8df63d1b27f2')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '377c99b7-883e-4a95-a503-ed32f41fd08b',
  'x-envoy-upstream-service-time',
  '271',
  'apim-request-id',
  '377c99b7-883e-4a95-a503-ed32f41fd08b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:08 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/9628395a-72c5-4765-bd0e-8df63d1b27f2')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '5535ffe9-1ccf-41c2-806a-1a73a93017cf',
  'x-envoy-upstream-service-time',
  '95',
  'apim-request-id',
  '5535ffe9-1ccf-41c2-806a-1a73a93017cf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:08 GMT'
]);
