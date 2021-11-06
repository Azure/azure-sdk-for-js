let nock = require('nock');

module.exports.hash = "d775b4b529b46a7c162abc14ac2974b9";

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
  '95a33dd3-1bf0-4407-b4b5-059070976900',
  'x-ms-ests-server',
  '2.1.12197.4 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AhFjJ2P5czhBoLyeVTEnsEXGLH8mAQAAAIjaF9kOAAAA; expires=Mon, 06-Dec-2021 02:08:09 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 06 Nov 2021 02:08:09 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks')
  .query(true)
  .reply(200, {"value":[{"hookId":"8c88db0d-0020-4b7d-b88b-0a1b1c0eb315","hookName":"js-test-emailHook-163122810639507343","hookType":"Email","externalLink":"","description":"description","admins":["azure_client_id","savaity@microsoft.com"],"hookParameter":{"toList":["test@example.com"]}},{"hookId":"9c5d8942-bcaf-4184-af2b-444446c5df50","hookName":"js-test-emailHook-163615467577705904","hookType":"Email","externalLink":"","description":"description","admins":["azure_client_id"],"hookParameter":{"toList":["test@example.com"]}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/hooks?hookName=js-test&$maxpagesize=2&$skip=2"}, [
  'Content-Length',
  '700',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '38cdab55-f184-4c3d-ab80-094cb0f815cd',
  'x-envoy-upstream-service-time',
  '70',
  'apim-request-id',
  '38cdab55-f184-4c3d-ab80-094cb0f815cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 06 Nov 2021 02:08:08 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks')
  .query(true)
  .reply(200, {"value":[{"hookId":"919c4d20-ca07-4e36-a693-977a20aceb5c","hookName":"js-test-emailHook-163615469774902335","hookType":"Email","externalLink":"","description":"description","admins":["azure_client_id"],"hookParameter":{"toList":["test@example.com"]}},{"hookId":"5b81406a-b843-4632-9009-59be2c000415","hookName":"js-test-emailHook-163616448381605574","hookType":"Email","externalLink":"","description":"description","admins":["azure_client_id"],"hookParameter":{"toList":["test2@example.com","test3@example.com"]}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/hooks?hookName=js-test&$maxpagesize=2&$skip=4"}, [
  'Content-Length',
  '697',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '9a402406-69b4-40b3-ad4b-7e0b5c7485b1',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  '9a402406-69b4-40b3-ad4b-7e0b5c7485b1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 06 Nov 2021 02:08:08 GMT'
]);
