let nock = require('nock');

module.exports.hash = "a75cd018be03a8dcaf5de17b524aa38d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

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
  'a64bd16b-9227-4b1e-ab2d-878e64aae400',
  'x-ms-ests-server',
  '2.1.11722.21 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AinGrRGBzI5Mg73OLQslIGHGLH8mEAAAAAZAMdgOAAAA; expires=Mon, 14-Jun-2021 04:10:40 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 15 May 2021 04:10:40 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/hooks/639bab6b-f575-4ffe-b091-0feea9c83088', {"hookType":"Webhook","hookParameter":{"endpoint":"https://httpbin.org/post","username":"user1","password":"pass123"}})
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '4d6f5b2c-5eb4-44ae-a24c-ff4336a051e7',
  'x-envoy-upstream-service-time',
  '721',
  'apim-request-id',
  '4d6f5b2c-5eb4-44ae-a24c-ff4336a051e7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:40 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/639bab6b-f575-4ffe-b091-0feea9c83088')
  .reply(200, {"hookId":"639bab6b-f575-4ffe-b091-0feea9c83088","hookName":"js-test-webHook-162105183747903645","hookType":"Webhook","externalLink":"","description":"description","admins":["azure_client_id"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user1","password":"pass123","headers":{},"certificateKey":"","certificatePassword":""}}, [
  'Content-Length',
  '368',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f22b4247-b2fb-483a-bd74-812a3f9ef7f7',
  'x-envoy-upstream-service-time',
  '80',
  'apim-request-id',
  'f22b4247-b2fb-483a-bd74-812a3f9ef7f7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:40 GMT'
]);
