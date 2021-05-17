let nock = require('nock');

module.exports.hash = "296b1dbcef57360a0b8d87b9d57c71a0";

module.exports.testInfo = {"uniqueName":{"js-test-emailHook-":"js-test-emailHook-162105183747905400","js-test-webHook-":"js-test-webHook-162105183747903645"},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1331',
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
  '0ca1795e-d8e4-4b08-a94e-0ed7b8f60700',
  'x-ms-ests-server',
  '2.1.11722.21 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AinGrRGBzI5Mg73OLQslIGHGLH8mEAAAAAZAMdgOAAAA; expires=Mon, 14-Jun-2021 04:10:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 15 May 2021 04:10:37 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/hooks', {"hookType":"Email","hookName":"js-test-emailHook-162105183747905400","description":"description","hookParameter":{"toList":["test@example.com"]}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/hooks/e79a9e2e-0bad-4712-b865-426b91e03725',
  'x-request-id',
  '8e204def-5625-4a4a-8922-45f0c8e6a818',
  'x-envoy-upstream-service-time',
  '772',
  'apim-request-id',
  '8e204def-5625-4a4a-8922-45f0c8e6a818',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:37 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/e79a9e2e-0bad-4712-b865-426b91e03725')
  .reply(200, {"hookId":"e79a9e2e-0bad-4712-b865-426b91e03725","hookName":"js-test-emailHook-162105183747905400","hookType":"Email","externalLink":"","description":"description","admins":["azure_client_id"],"hookParameter":{"toList":["test@example.com"]}}, [
  'Content-Length',
  '262',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f7b5760b-10e0-416b-b511-72dcd78eb0fe',
  'x-envoy-upstream-service-time',
  '103',
  'apim-request-id',
  'f7b5760b-10e0-416b-b511-72dcd78eb0fe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:37 GMT'
]);
