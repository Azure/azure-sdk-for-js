let nock = require('nock');

module.exports.hash = "fef9512daf1968a4c750b0e161a6cc2b";

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
  'ed3de083-f3f7-42df-81a8-5ec4004c0100',
  'x-ms-ests-server',
  '2.1.11787.14 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AvAsiKRfhp5Eh637Nh0cx6LGLH8mAgAAAJ_hSdgOAAAA; expires=Fri, 02-Jul-2021 20:31:29 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 02 Jun 2021 20:31:29 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/hooks', {"hookType":"Webhook","hookName":"js-test-webHook-162266588772100390","description":"description","hookParameter":{"endpoint":"https://mawebhook.azurewebsites.net/api/HttpTrigger","username":"user","password":"pass"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/hooks/7911e86d-8d5b-4c08-8a8f-480f15b2d2b5',
  'x-request-id',
  '1801c597-7060-4e3f-b1a2-6be5e899b046',
  'x-envoy-upstream-service-time',
  '1229',
  'apim-request-id',
  '1801c597-7060-4e3f-b1a2-6be5e899b046',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 20:31:31 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/7911e86d-8d5b-4c08-8a8f-480f15b2d2b5')
  .reply(200, {"hookId":"7911e86d-8d5b-4c08-8a8f-480f15b2d2b5","hookName":"js-test-webHook-162266588772100390","hookType":"Webhook","externalLink":"","description":"description","admins":["azure_client_id"],"hookParameter":{"endpoint":"https://mawebhook.azurewebsites.net/api/HttpTrigger","username":"user","password":"pass","headers":{},"certificateKey":"","certificatePassword":""}}, [
  'Content-Length',
  '391',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'b744d0f0-8e03-4eb4-8cb4-6efe8c72672a',
  'x-envoy-upstream-service-time',
  '5166',
  'apim-request-id',
  'b744d0f0-8e03-4eb4-8cb4-6efe8c72672a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 20:31:36 GMT'
]);
