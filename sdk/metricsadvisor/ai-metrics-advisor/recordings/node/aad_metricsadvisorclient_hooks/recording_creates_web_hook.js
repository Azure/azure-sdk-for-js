let nock = require('nock');

module.exports.hash = "f45b14607343ef5ffa520f5a98da405f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
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
  'd2539dfe-e0f5-4253-9fbc-5b6284b4d200',
  'x-ms-ests-server',
  '2.1.11722.21 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AinGrRGBzI5Mg73OLQslIGHGLH8mEAAAAAZAMdgOAAAA; expires=Mon, 14-Jun-2021 04:10:38 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 15 May 2021 04:10:38 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/hooks', {"hookType":"Webhook","hookName":"js-test-webHook-162105183747903645","description":"description","hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/hooks/639bab6b-f575-4ffe-b091-0feea9c83088',
  'x-request-id',
  '32f6eec9-a09a-48c1-9c9a-ce66cde59911',
  'x-envoy-upstream-service-time',
  '797',
  'apim-request-id',
  '32f6eec9-a09a-48c1-9c9a-ce66cde59911',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:38 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/639bab6b-f575-4ffe-b091-0feea9c83088')
  .reply(200, {"hookId":"639bab6b-f575-4ffe-b091-0feea9c83088","hookName":"js-test-webHook-162105183747903645","hookType":"Webhook","externalLink":"","description":"description","admins":["azure_client_id"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass","headers":{},"certificateKey":"","certificatePassword":""}}, [
  'Content-Length',
  '364',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '943f7c6f-75f1-461b-bf67-a9c271b93f36',
  'x-envoy-upstream-service-time',
  '88',
  'apim-request-id',
  '943f7c6f-75f1-461b-bf67-a9c271b93f36',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:38 GMT'
]);
