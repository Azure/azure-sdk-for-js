let nock = require('nock');

module.exports.hash = "6376e4be60f1e0ab33154cc794cd4a79";

module.exports.testInfo = {"uniqueName":{"js-test-emailHook-":"js-test-emailHook-163636435219507513","js-test-webHook-":"js-test-webHook-163636435219503623"},"newDate":{}}

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
  'b2a01c86-1f7c-49a8-bfe3-f1bce7609c00',
  'x-ms-ests-server',
  '2.1.12197.4 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Atj_04_LJEtCin5Z5U52U5s; expires=Wed, 08-Dec-2021 09:39:12 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 08 Nov 2021 09:39:11 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/hooks', {"hookType":"Email","hookName":"js-test-emailHook-163636435219507513","description":"description","hookParameter":{"toList":["test@example.com"]}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/hooks/110dde60-9005-4b5d-bc73-f84073a40277',
  'x-request-id',
  'd53c74ca-4f96-4bce-b3c0-0783fb08a20f',
  'x-envoy-upstream-service-time',
  '246',
  'apim-request-id',
  'd53c74ca-4f96-4bce-b3c0-0783fb08a20f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:11 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/110dde60-9005-4b5d-bc73-f84073a40277')
  .reply(200, {"hookId":"110dde60-9005-4b5d-bc73-f84073a40277","hookName":"js-test-emailHook-163636435219507513","hookType":"Email","externalLink":"","description":"description","admins":["azure_client_id"],"hookParameter":{"toList":["test@example.com"]}}, [
  'Content-Length',
  '262',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '7b13fc04-5e31-4601-95dc-17301d20d2db',
  'x-envoy-upstream-service-time',
  '109',
  'apim-request-id',
  '7b13fc04-5e31-4601-95dc-17301d20d2db',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:12 GMT'
]);
