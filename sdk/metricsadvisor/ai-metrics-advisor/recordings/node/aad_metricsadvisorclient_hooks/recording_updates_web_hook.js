let nock = require('nock');

module.exports.hash = "05858e63ce7f83f298e3aadaccd98c0a";

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
  'd2417219-4213-4ffe-b3a8-215f2b4bba00',
  'x-ms-ests-server',
  '2.1.12197.4 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AjLCxJohCstKmNT_gHFU1Z4; expires=Wed, 08-Dec-2021 09:39:14 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 08 Nov 2021 09:39:14 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/hooks/c70cfc52-3283-4c87-89be-f364dabd178e', {"hookType":"Webhook","hookParameter":{"endpoint":"https://httpbin.org/post","username":"user1","password":"SecretPlaceholder"}})
  .reply(200, {"hookId":"c70cfc52-3283-4c87-89be-f364dabd178e","hookName":"js-test-webHook-163636435219503623","hookType":"Webhook","externalLink":"","description":"description","admins":["azure_client_id"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user1","password":"SecretPlaceholder"}}, [
  'Content-Length',
  '320',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '4d712a6e-ddf2-48bf-b0d1-d63c36875503',
  'x-envoy-upstream-service-time',
  '1738',
  'apim-request-id',
  '4d712a6e-ddf2-48bf-b0d1-d63c36875503',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:16 GMT'
]);
