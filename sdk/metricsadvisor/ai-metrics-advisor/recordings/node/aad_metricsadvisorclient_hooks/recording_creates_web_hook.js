let nock = require('nock');

module.exports.hash = "6f0858a8a1c852a2b58efd48a1c63d3e";

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
  'c211e01d-cf15-4f96-b833-5ee429428c00',
  'x-ms-ests-server',
  '2.1.12197.4 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Ak1u-cbOs5JNs5iY_sNZ_a4; expires=Wed, 08-Dec-2021 09:39:12 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 08 Nov 2021 09:39:12 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/hooks', {"hookType":"Webhook","hookName":"js-test-webHook-163636435219503623","description":"description","hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/hooks/c70cfc52-3283-4c87-89be-f364dabd178e',
  'x-request-id',
  'abc498a5-d898-419b-bae6-1ae2b59c43bb',
  'x-envoy-upstream-service-time',
  '853',
  'apim-request-id',
  'abc498a5-d898-419b-bae6-1ae2b59c43bb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:12 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/c70cfc52-3283-4c87-89be-f364dabd178e')
  .reply(200, {"hookId":"c70cfc52-3283-4c87-89be-f364dabd178e","hookName":"js-test-webHook-163636435219503623","hookType":"Webhook","externalLink":"","description":"description","admins":["azure_client_id"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass"}}, [
  'Content-Length',
  '306',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '8ba16875-3d66-4c7b-9660-3cb06ca579db',
  'x-envoy-upstream-service-time',
  '115',
  'apim-request-id',
  '8ba16875-3d66-4c7b-9660-3cb06ca579db',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:13 GMT'
]);
