let nock = require('nock');

module.exports.hash = "b0767c76b6c02bf13930041c90015293";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/72698866-8641-4147-9144-24744011447/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fsanitized%2F")
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
  '9a129b30-e83f-42f3-ba29-ed20be51b100',
  'x-ms-ests-server',
  '2.1.12197.4 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Aq5OYUBRi89PmELFsF-5lkY; expires=Wed, 08-Dec-2021 09:39:17 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 08 Nov 2021 09:39:16 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/hooks/c70cfc52-3283-4c87-89be-f364dabd178e')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '774ab43c-a0df-4c73-9d40-50becbd28301',
  'x-envoy-upstream-service-time',
  '135',
  'apim-request-id',
  '774ab43c-a0df-4c73-9d40-50becbd28301',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:17 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/c70cfc52-3283-4c87-89be-f364dabd178e')
  .reply(404, {"code":"404 NOT_FOUND","message":"hookId is invalid."}, [
  'Content-Length',
  '55',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '5600b375-4740-4d22-a30f-1a0b0f1fb78f',
  'x-envoy-upstream-service-time',
  '26',
  'apim-request-id',
  '5600b375-4740-4d22-a30f-1a0b0f1fb78f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:17 GMT'
]);
