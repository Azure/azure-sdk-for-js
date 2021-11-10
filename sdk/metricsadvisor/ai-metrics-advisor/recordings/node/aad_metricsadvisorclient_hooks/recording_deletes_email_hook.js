let nock = require('nock');

module.exports.hash = "7057a8ca17e949a053f56d53572dabc8";

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
  'f8658aa5-d35d-4881-aa7f-43958f1fb700',
  'x-ms-ests-server',
  '2.1.12197.4 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AuqPLlRn-5FPhzsOFjwDaAo; expires=Wed, 08-Dec-2021 09:39:17 GMT; path=/; secure; HttpOnly; SameSite=None',
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
  .delete('/metricsadvisor/v1.0/hooks/110dde60-9005-4b5d-bc73-f84073a40277')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '45ac4a67-1700-4eff-a2fa-b1dfb4af9643',
  'x-envoy-upstream-service-time',
  '136',
  'apim-request-id',
  '45ac4a67-1700-4eff-a2fa-b1dfb4af9643',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:17 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/110dde60-9005-4b5d-bc73-f84073a40277')
  .reply(404, {"code":"404 NOT_FOUND","message":"hookId is invalid."}, [
  'Content-Length',
  '55',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '70714721-c09f-4e77-90ad-4e1e258e2dad',
  'x-envoy-upstream-service-time',
  '26',
  'apim-request-id',
  '70714721-c09f-4e77-90ad-4e1e258e2dad',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:17 GMT'
]);
