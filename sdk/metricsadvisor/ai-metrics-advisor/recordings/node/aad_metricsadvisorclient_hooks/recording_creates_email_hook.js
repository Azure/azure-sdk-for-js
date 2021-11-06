let nock = require('nock');

module.exports.hash = "6376e4be60f1e0ab33154cc794cd4a79";

module.exports.testInfo = {"uniqueName":{"js-test-emailHook-":"js-test-emailHook-163616448381605574","js-test-webHook-":"js-test-webHook-163616448381601567"},"newDate":{}}

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
  'dee07769-9593-4083-baea-2ce96e366500',
  'x-ms-ests-server',
  '2.1.12197.4 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AkFBXJ717XdFll674pQ-Lz3GLH8mAQAAAITaF9kOAAAA; expires=Mon, 06-Dec-2021 02:08:04 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 06 Nov 2021 02:08:04 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/hooks', {"hookType":"Email","hookName":"js-test-emailHook-163616448381605574","description":"description","hookParameter":{"toList":["test@example.com"]}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/hooks/5b81406a-b843-4632-9009-59be2c000415',
  'x-request-id',
  'db64b563-cbf2-4896-8d40-b328a71b5e75',
  'x-envoy-upstream-service-time',
  '449',
  'apim-request-id',
  'db64b563-cbf2-4896-8d40-b328a71b5e75',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 06 Nov 2021 02:08:04 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/5b81406a-b843-4632-9009-59be2c000415')
  .reply(200, {"hookId":"5b81406a-b843-4632-9009-59be2c000415","hookName":"js-test-emailHook-163616448381605574","hookType":"Email","externalLink":"","description":"description","admins":["azure_client_id"],"hookParameter":{"toList":["test@example.com"]}}, [
  'Content-Length',
  '262',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'af74ce41-84cf-4990-9872-d2f36c215b5a',
  'x-envoy-upstream-service-time',
  '125',
  'apim-request-id',
  'af74ce41-84cf-4990-9872-d2f36c215b5a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 06 Nov 2021 02:08:04 GMT'
]);
