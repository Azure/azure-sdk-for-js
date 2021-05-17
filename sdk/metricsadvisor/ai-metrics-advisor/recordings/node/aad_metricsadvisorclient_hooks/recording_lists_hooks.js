let nock = require('nock');

module.exports.hash = "777c512b7287926c2d6ff181e6b1e861";

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
  '80982f6d-d1ae-4dc9-bb31-f11e80815300',
  'x-ms-ests-server',
  '2.1.11722.21 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AinGrRGBzI5Mg73OLQslIGHGLH8mEAAAAAZAMdgOAAAA; expires=Mon, 14-Jun-2021 04:10:41 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 15 May 2021 04:10:41 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks')
  .query(true)
  .reply(200, {"value":[{"hookId":"2b755260-7a5a-435c-bc98-1098d5aa8280","hookName":"js-test-emailHook-161531685527403780","hookType":"Email","externalLink":"","description":"description","admins":["azure_client_id"],"hookParameter":{"toList":["test@example.com"]}},{"hookId":"874704b3-80d3-4e78-929d-64be2accfb4f","hookName":"js-test-emailHook-161531685824404287","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test@example.com"]}},{"hookId":"5710d5c4-6aae-42c9-9bdf-e9ddcc5c89d5","hookName":"js-test-emailHook-161531705490304712","hookType":"Email","externalLink":"","description":"description","admins":["azure_client_id"],"hookParameter":{"toList":["test@example.com"]}},{"hookId":"54b8eea6-fdfc-4fd7-a7b5-b8dfa1d37d70","hookName":"js-test-emailHook-161531705673800660","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test@example.com"]}},{"hookId":"806f1f85-63af-463f-b8b2-22d1f29cb248","hookName":"js-test-emailHook-162015550185600302","hookType":"Email","externalLink":"","description":"description","admins":["azure_client_id"],"hookParameter":{"toList":["test@example.com"]}},{"hookId":"e79a9e2e-0bad-4712-b865-426b91e03725","hookName":"js-test-emailHook-162105183747905400","hookType":"Email","externalLink":"","description":"description","admins":["azure_client_id"],"hookParameter":{"toList":["test2@example.com","test3@example.com"]}},{"hookId":"0bfed82b-af19-4838-b5e1-5746f6781d62","hookName":"js-test-webHook-161531253603907468","hookType":"Webhook","externalLink":"","description":"description","admins":["azure_client_id"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass","headers":{},"certificateKey":"","certificatePassword":""}},{"hookId":"e391a9c1-04bb-44cf-9a43-78a373b14bae","hookName":"js-test-webHook-161531828969607724","hookType":"Webhook","externalLink":"","description":"description","admins":["azure_client_id"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass","headers":{},"certificateKey":"","certificatePassword":""}},{"hookId":"1ecc09b3-0ad9-4ecf-a34a-8a576de78fbd","hookName":"js-test-webHook-161531829480305604","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass","headers":{},"certificateKey":"","certificatePassword":""}},{"hookId":"dbe5351c-e639-4335-90e7-35c6f71c0a4e","hookName":"js-test-webHook-161531859165202085","hookType":"Webhook","externalLink":"","description":"description","admins":["azure_client_id"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass","headers":{},"certificateKey":"","certificatePassword":""}},{"hookId":"1314214b-cedc-42d0-a3fe-368857bf786b","hookName":"js-test-webHook-161531859960401262","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass","headers":{},"certificateKey":"","certificatePassword":""}},{"hookId":"54b2656e-4d97-46e2-a1c2-670cb9e40f22","hookName":"js-test-webHook-161531877402407296","hookType":"Webhook","externalLink":"","description":"description","admins":["azure_client_id"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass","headers":{},"certificateKey":"","certificatePassword":""}},{"hookId":"a8db2484-9b93-4ed0-8c76-94dfcd17fe6e","hookName":"js-test-webHook-161531878351801649","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass","headers":{},"certificateKey":"","certificatePassword":""}},{"hookId":"3b66e660-814d-4b16-891a-12f8597a0f87","hookName":"js-test-webHook-162015550185604122","hookType":"Webhook","externalLink":"","description":"description","admins":["azure_client_id"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass","headers":{},"certificateKey":"","certificatePassword":""}},{"hookId":"639bab6b-f575-4ffe-b091-0feea9c83088","hookName":"js-test-webHook-162105183747903645","hookType":"Webhook","externalLink":"","description":"description","admins":["azure_client_id"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user1","password":"pass123","headers":{},"certificateKey":"","certificatePassword":""}}]}, [
  'Content-Length',
  '4824',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'b18868da-be65-4543-848b-a8abeba5487f',
  'x-envoy-upstream-service-time',
  '43',
  'apim-request-id',
  'b18868da-be65-4543-848b-a8abeba5487f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:40 GMT'
]);
