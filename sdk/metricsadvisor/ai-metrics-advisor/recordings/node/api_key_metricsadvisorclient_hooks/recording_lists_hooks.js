let nock = require('nock');

module.exports.hash = "777c512b7287926c2d6ff181e6b1e861";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks')
  .query(true)
  .reply(200, {"value":[{"hookId":"874704b3-80d3-4e78-929d-64be2accfb4f","hookName":"js-test-emailHook-161531685824404287","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test@example.com"]}},{"hookId":"54b8eea6-fdfc-4fd7-a7b5-b8dfa1d37d70","hookName":"js-test-emailHook-161531705673800660","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test@example.com"]}},{"hookId":"f07da91b-3d76-4317-a0b1-ddc56e74e214","hookName":"js-test-emailHook-162105184287406231","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test2@example.com","test3@example.com"]}},{"hookId":"1ecc09b3-0ad9-4ecf-a34a-8a576de78fbd","hookName":"js-test-webHook-161531829480305604","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass","headers":{},"certificateKey":"","certificatePassword":""}},{"hookId":"1314214b-cedc-42d0-a3fe-368857bf786b","hookName":"js-test-webHook-161531859960401262","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass","headers":{},"certificateKey":"","certificatePassword":""}},{"hookId":"a8db2484-9b93-4ed0-8c76-94dfcd17fe6e","hookName":"js-test-webHook-161531878351801649","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass","headers":{},"certificateKey":"","certificatePassword":""}},{"hookId":"1005f307-4cb0-40cf-8c17-e2160babcd1b","hookName":"js-test-webHook-162105184287407101","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user1","password":"pass123","headers":{},"certificateKey":"","certificatePassword":""}}]}, [
  'Content-Length',
  '2180',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '7050e6b5-9a13-4a58-aefd-1e783b1ddd96',
  'x-envoy-upstream-service-time',
  '128',
  'apim-request-id',
  '7050e6b5-9a13-4a58-aefd-1e783b1ddd96',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:46 GMT'
]);
