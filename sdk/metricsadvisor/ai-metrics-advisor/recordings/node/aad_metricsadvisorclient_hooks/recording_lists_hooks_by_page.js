let nock = require('nock');

module.exports.hash = "8aa08cebc2e345d514d255814af01f9e";

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
  'f56306f6-2220-438f-877a-1735a0530100',
  'x-ms-ests-server',
  '2.1.11787.14 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AvAsiKRfhp5Eh637Nh0cx6LGLH8mBQAAAJ_hSdgOAAAA; expires=Fri, 02-Jul-2021 20:31:54 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 02 Jun 2021 20:31:54 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks')
  .query(true)
  .reply(200, {"value":[{"hookId":"2b755260-7a5a-435c-bc98-1098d5aa8280","hookName":"js-test-emailHook-161531685527403780","hookType":"Email","externalLink":"","description":"description","admins":["azure_client_id"],"hookParameter":{"toList":["test@example.com"]}},{"hookId":"874704b3-80d3-4e78-929d-64be2accfb4f","hookName":"js-test-emailHook-161531685824404287","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test@example.com"]}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/hooks?hookName=js-test&$maxpagesize=2&$skip=2"}, [
  'Content-Length',
  '661',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c3f4ce34-3efc-426a-8b98-06fcc4ba0ed5',
  'x-envoy-upstream-service-time',
  '103',
  'apim-request-id',
  'c3f4ce34-3efc-426a-8b98-06fcc4ba0ed5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 20:31:54 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks')
  .query(true)
  .reply(200, {"value":[{"hookId":"5710d5c4-6aae-42c9-9bdf-e9ddcc5c89d5","hookName":"js-test-emailHook-161531705490304712","hookType":"Email","externalLink":"","description":"description","admins":["azure_client_id"],"hookParameter":{"toList":["test@example.com"]}},{"hookId":"54b8eea6-fdfc-4fd7-a7b5-b8dfa1d37d70","hookName":"js-test-emailHook-161531705673800660","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test@example.com"]}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/hooks?hookName=js-test&$maxpagesize=2&$skip=4"}, [
  'Content-Length',
  '661',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '5646daae-e43a-458b-8b5e-5b4a9ae232ee',
  'x-envoy-upstream-service-time',
  '5149',
  'apim-request-id',
  '5646daae-e43a-458b-8b5e-5b4a9ae232ee',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 20:31:59 GMT'
]);
