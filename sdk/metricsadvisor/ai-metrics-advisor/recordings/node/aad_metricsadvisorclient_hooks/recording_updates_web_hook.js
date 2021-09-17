let nock = require('nock');

module.exports.hash = "4538131073c0be8d2c3b7d9323573a49";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

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
  '5d4b3908-01e1-4f99-9176-87a78a840700',
  'x-ms-ests-server',
  '2.1.11787.14 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AvAsiKRfhp5Eh637Nh0cx6LGLH8mBAAAAJ_hSdgOAAAA; expires=Fri, 02-Jul-2021 20:31:42 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 02 Jun 2021 20:31:42 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/hooks/7911e86d-8d5b-4c08-8a8f-480f15b2d2b5', {"hookType":"Webhook","hookParameter":{"endpoint":"https://mawebhook.azurewebsites.net/api/HttpTrigger","username":"user1","password":"SecretPlaceholder"}})
  .reply(200, {"hookId":"7911e86d-8d5b-4c08-8a8f-480f15b2d2b5","hookName":"js-test-webHook-162266588772100390","hookType":"Webhook","externalLink":"","description":"description","admins":["azure_client_id"],"hookParameter":{"endpoint":"https://mawebhook.azurewebsites.net/api/HttpTrigger","username":"user1","password":"SecretPlaceholder","headers":{},"certificateKey":"","certificatePassword":""}}, [
  'Content-Length',
  '395',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '732a7bc7-7bac-47be-8dc7-93d499d392b3',
  'x-envoy-upstream-service-time',
  '6102',
  'apim-request-id',
  '732a7bc7-7bac-47be-8dc7-93d499d392b3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 20:31:48 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/7911e86d-8d5b-4c08-8a8f-480f15b2d2b5')
  .reply(200, {"hookId":"7911e86d-8d5b-4c08-8a8f-480f15b2d2b5","hookName":"js-test-webHook-162266588772100390","hookType":"Webhook","externalLink":"","description":"description","admins":["azure_client_id"],"hookParameter":{"endpoint":"https://mawebhook.azurewebsites.net/api/HttpTrigger","username":"user1","password":"SecretPlaceholder","headers":{},"certificateKey":"","certificatePassword":""}}, [
  'Content-Length',
  '395',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'e0e0fa9d-f9ae-42a5-8b42-3e8d496dff03',
  'x-envoy-upstream-service-time',
  '5138',
  'apim-request-id',
  'e0e0fa9d-f9ae-42a5-8b42-3e8d496dff03',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 20:31:53 GMT'
]);
