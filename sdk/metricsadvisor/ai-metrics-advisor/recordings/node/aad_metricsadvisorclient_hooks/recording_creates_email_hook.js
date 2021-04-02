let nock = require('nock');

module.exports.hash = "296b1dbcef57360a0b8d87b9d57c71a0";

module.exports.testInfo = {"uniqueName":{"js-test-emailHook-":"js-test-emailHook-161070017173203096","js-test-webHook-":"js-test-webHook-161070017173206434"},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
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
  'e515a0ac-774c-4bac-90a8-e8df29f44a00',
  'x-ms-ests-server',
  '2.1.11397.13 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AsoDeAShyiJLlORVED-UD3HGLH8mEwAAAGdLk9cOAAAA; expires=Sun, 14-Feb-2021 08:42:51 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 15 Jan 2021 08:42:51 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/hooks', {"hookType":"Email","hookName":"js-test-emailHook-161070017173203096","description":"description","hookParameter":{"toList":["test@example.com"]}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/hooks/939c72dd-3b2e-47ee-b2bc-d4ab7a0950be',
  'x-request-id',
  '4fb0b57e-5fc0-465a-8f69-fb2e0277245e',
  'x-envoy-upstream-service-time',
  '375',
  'apim-request-id',
  '4fb0b57e-5fc0-465a-8f69-fb2e0277245e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:42:51 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/939c72dd-3b2e-47ee-b2bc-d4ab7a0950be')
  .reply(200, {"hookId":"939c72dd-3b2e-47ee-b2bc-d4ab7a0950be","hookName":"js-test-emailHook-161070017173203096","hookType":"Email","externalLink":"","description":"description","admins":["azure_client_id"],"hookParameter":{"toList":["test@example.com"]}}, [
  'Content-Length',
  '262',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '2598c560-fa4b-4a88-b9b7-16ead10c801f',
  'x-envoy-upstream-service-time',
  '171',
  'apim-request-id',
  '2598c560-fa4b-4a88-b9b7-16ead10c801f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:42:52 GMT'
]);
